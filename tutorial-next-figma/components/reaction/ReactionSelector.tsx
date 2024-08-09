import Reaction from "@/constants/reaction.enum";
import ReactionButton from "./ReactionButton";

interface ReactionSelectorProps {
  setReaction: (reaction: Reaction) => void;
}

function ReactionSelector({ setReaction }: ReactionSelectorProps) {
  return (
    <div
      className="absolute bottom-20 mx-auto w-fit transform rounded-full bg-white px-2"
      onPointerMove={(e) => e.stopPropagation()}
    >
      <ReactionButton reaction={Reaction.THUMBS_UP} onSelect={setReaction} />
      <ReactionButton reaction={Reaction.FIRE} onSelect={setReaction} />
      <ReactionButton reaction={Reaction.LOVE} onSelect={setReaction} />
      <ReactionButton reaction={Reaction.EYES} onSelect={setReaction} />
      <ReactionButton reaction={Reaction.FEAR} onSelect={setReaction} />
      <ReactionButton reaction={Reaction.SAD} onSelect={setReaction} />
    </div>
  );
}

export default ReactionSelector;
