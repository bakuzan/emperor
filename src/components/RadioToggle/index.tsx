import './RadioToggle.scss';
import React, { useRef, useState } from 'react';

import { Icons } from '@/consts';
import cx from '@/utils/cx';

const defaultIcons = [Icons.cross, Icons.tick];

interface RadioToggleProps
  extends Omit<React.HTMLProps<HTMLInputElement>, 'onChange'> {
  icons?: string[];
  label: string;
  onChange: (checked: boolean, name: string) => void;
}

function RadioToggle({
  className,
  label,
  icons = defaultIcons,
  ...props
}: RadioToggleProps) {
  const [focused, setFocus] = useState(false);
  const ref = useRef<HTMLInputElement | null>();

  const classes = cx(
    `radio-toggle`,
    props.checked && 'radio-toggle--checked',
    focused && 'radio-toggle--focused',
    className
  );

  return (
    <div
      className={classes}
      onClick={(event) => {
        const checkbox = ref.current;
        const { target } = event;

        if (target !== checkbox && checkbox) {
          event.preventDefault();
          checkbox.focus();
          checkbox.click();
        }
      }}
    >
      <div className="radio-toggle__options">
        <div className="radio-toggle__option radio-toggle__checked">
          {icons[0]}
        </div>
        <div className="radio-toggle__option radio-toggle__unchecked">
          {icons[1]}
        </div>
      </div>
      <div className="radio-toggle__control" />
      <input
        {...props}
        ref={ref as React.RefObject<HTMLInputElement>}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => {
          const { checked, name } = e.target;
          props.onChange(checked, name);
        }}
        className="radio-toggle__for-screenreader"
        type="checkbox"
        aria-label={label}
      />
    </div>
  );
}

RadioToggle.displayName = 'RadioToggle';

export default RadioToggle;
