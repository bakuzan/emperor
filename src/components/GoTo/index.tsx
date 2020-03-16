import React, { useState, useEffect, useRef } from 'react';
import { navigate } from '@reach/router';

import AutocompleteInput from 'meiko/AutocompleteInput';
import TabTrap from 'meiko/TabTrap';
import { EventCodes } from 'meiko/constants/enums';
import { useOutsideClick } from 'meiko/hooks/useOutsideClick';

import { Emperor } from '@/interfaces/Emperor';
import slugToIdentifier from '@/utils/slugToIdentifier';
import { rhythm } from '@/utils/typography';

interface GoToProps<T extends Emperor> {
  data: T[];
}

const exceptionClasses = ['clearable-input__clear'];
const getStyle = (show: boolean): React.CSSProperties =>
  show
    ? { opacity: 1, visibility: 'visible' }
    : {
        opacity: 0,
        visibility: 'hidden',
        pointerEvents: 'none',
        marginTop: `50px`
      };

function GoTo<T extends Emperor>({ data }: GoToProps<T>) {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const timer = useRef(0);
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');

  const displayStyle = getStyle(show);
  const typeAheadItems = data.map((x) => ({ id: x.slug, name: x.name }));

  function onClose() {
    setShow(false);
    setText('');
  }

  function onSelect(hash: string) {
    navigate(`#${hash}`);

    document.getElementById(hash)?.focus();
    onClose();
  }

  useOutsideClick(ref.current, (e) => {
    const t = e.target;
    const isEscape = e.key === EventCodes.Escape;
    const noTarget = !t;
    const isNotException =
      t && !exceptionClasses.some((s) => t.className.includes(s));

    if (noTarget || isEscape || isNotException) {
      onClose();
    }
  });

  useEffect(() => {
    function listenShortcut(event: KeyboardEvent) {
      if (!show && event.key === EventCodes.KeyG) {
        setShow(true);
      }
    }

    window.addEventListener('keypress', listenShortcut);
    return () => window.removeEventListener('keypress', listenShortcut);
  }, [show]);

  useEffect(() => {
    if (show) {
      clearTimeout(timer.current);
      timer.current = window.setTimeout(
        () => document.getElementById('goto')?.focus(),
        501
      );
    }
  }, [show]);

  return (
    <TabTrap
      ref={ref}
      isActive={show}
      firstId="goto"
      lastId="goto"
      className="goto-widget"
      aria-hidden={!show}
      style={{
        position: 'fixed',
        top: '25%',
        left: `50%`,
        padding: rhythm(1),
        margin: '0 auto',
        marginTop: '0',
        backgroundColor: `var(--background-colour)`,
        minWidth: `300px`,
        width: `50%`,
        transform: `translateX(-50%) translateY(-50%)`,
        transition: `all 0.5s ease-in-out`,
        boxShadow: `0px 0px 4px 1px var(--primary-colour)`,
        ...displayStyle
      }}
    >
      <AutocompleteInput
        id="goto"
        attr="name"
        items={typeAheadItems}
        filter={text}
        label="Find and go to an emperor on the page"
        onChange={(e) => setText(e.currentTarget?.value ?? '')}
        onSelect={(slug) => {
          const emperorSlug = slug as string;
          const hash = slugToIdentifier(emperorSlug);
          onSelect(hash);
        }}
        noSuggestionsItem={<div>No emperors were found for `{text}`</div>}
      />
    </TabTrap>
  );
}

export default GoTo;
