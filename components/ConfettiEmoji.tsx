import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { IconHeartFilled } from "@tabler/icons-react";

interface ConfettiEmojiProps {
  count: string;
  onClick: (e: React.FormEvent) => Promise<void>
}

export function ConfettiEmoji({ count, onClick }: ConfettiEmojiProps) {
  const handleClick = (event: React.MouseEvent) => {
    onClick
    const { clientX: x, clientY: y } = event;

    const heartIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.44 5.44 0 0 1-7.7 0c0 2.09-1.05 3.9-2.55 4.5l1.6 1.6c.3.3.8.3 1.1 0l4-4z"></path><path d="M10 20h4v-4a4 4 0 0 0-4-4H10a4 4 0 0 0-4 4v4"></path></svg>`;

    const svgDataUrl = `data:image/svg+xml;base64,${btoa(heartIcon)}`;

    const defaults = {
      spread: 360,
      ticks: 60,
      gravity: 0,
      decay: 0.96,
      startVelocity: 20,
      shapes: [{
        type: 'image',
        src: svgDataUrl, 
        width: 24, 
        height: 24,
      }],
      scalar: 2,
      origin: { x: (x / window.innerWidth), y: (y / window.innerHeight) }, 
    };

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 15,
        scalar: 0.5,
        shapes: ["circle"],
      });
    };

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  };

  return (
    <div onClick={handleClick} className="flex flex-row items-center justify-center gap-1 px-2">
      <IconHeartFilled size={12} /> {count}
    </div>
  );
}
