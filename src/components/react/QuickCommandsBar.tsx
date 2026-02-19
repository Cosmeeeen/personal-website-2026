import { terminalInput } from '../../stores/terminalStore';

const commands = [
  { label: 'ls', value: 'ls' },
  { label: 'cat experience.txt', value: 'cat experience.txt' },
  { label: 'whoami', value: 'whoami' },
  { label: 'clear', value: 'clear' },
  { label: 'download-cv', value: 'download-cv' }
];

export default function QuickCommands() {
  const handleCommandClick = (cmdValue: string) => {
    terminalInput.set('');

    let currentText: string = '';

    const typewriterEffect = (text: string, index: number) => {
      if (index < text.length) {
        terminalInput.set(currentText + text[index]);
        currentText += text[index];
        setTimeout(() => typewriterEffect(text, index + 1), 20);
      }
    }

    typewriterEffect(cmdValue, 0);
  };

  return (
    <nav className="flex gap-4 py-2 no-scrollbar snap-x px-2">
      {commands.map((cmd) => (
        <button
          key={cmd.label}
          type="button"
          onClick={() => handleCommandClick(cmd.value)}
          className={`
            snap-center shrink-0 min-h-[32px] px-6 rounded-full
            font-sans text-[13px] font-bold text-white
            transition-all cursor-default select-none outline-none

            bg-gradient-to-b from-[#7db6f1] via-[#3875d7] to-[#7db6f1]
            bg-[length:100%_200%] bg-top

            border border-[#1d4a85]
            shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.4)]

            relative overflow-hidden
            before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-[48%]
            before:bg-gradient-to-b before:from-white/70 before:to-white/10
            before:rounded-t-full before:mx-[1px]

            after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-[30%]
            after:bg-white/10 after:blur-md

            hover:brightness-110 hover:shadow-[0_0_15px_rgba(125,182,241,0.5)]
            active:bg-bottom active:scale-95 active:shadow-inner

            focus-visible:ring-[3px] focus-visible:ring-[#7db6f1]/60 
            `}
          >
          <span className="relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
            {cmd.label}
          </span>
        </button>
      ))}
    </nav>
  );
}
