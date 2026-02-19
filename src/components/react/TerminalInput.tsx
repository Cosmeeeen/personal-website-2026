import React from 'react';

import { useStore } from '@nanostores/react';

import QuickCommandsBar from './QuickCommandsBar';
import { TERMINAL_PREFIX } from '../../constants';
import { terminalInput } from '../../stores/terminalStore';

const TerminalInput: React.FC = () => {
  const $inputValue = useStore(terminalInput);
  const [cursorPos, setCursorPos] = React.useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    terminalInput.set(e.target.value);
  }

  const handleUpdateCursor = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setCursorPos(e.currentTarget.selectionEnd || 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Submitted: ${$inputValue}`);
    terminalInput.set('');
  }

  React.useEffect(() => {
    handleUpdateCursor({ 
      currentTarget: { 
        selectionEnd: $inputValue.length
      }} as React.SyntheticEvent<HTMLInputElement>
    );
  }, [$inputValue]);

  return (
    <>
      <p>
        <span className="text-green-500">
          {TERMINAL_PREFIX}
        </span>

        <div className="inline-grid relative">
          <input
            type="text"
            id="terminal-input"
            value={$inputValue}
            onChange={handleInputChange}
            className="col-start-1 row-start-1 bg-transparent caret-transparent border-none focus:outline-none [field-sizing:content] min-w-0"
            onSelect={handleUpdateCursor}
            onKeyUp={handleUpdateCursor}
            onKeyDown={handleKeyDown}
            onClick={handleUpdateCursor}
            spellCheck={false}
          />
          <span
            className="col-start-1 row-start-1 h-[2px] w-[1ch] self-end bg-white animate-blink pointer-events-none transition-[margin] duration-25"
            style={{ 
              marginLeft: `${cursorPos}ch`,
            }}
          ></span>
        </div>
      </p>
      <QuickCommandsBar />
    </>
  );
}

export default TerminalInput;
