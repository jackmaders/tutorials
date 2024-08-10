import Reaction from "@/constants/enums/reaction.enum";

type ReactionEvent = {
  reaction: Reaction;
  timestamp: number;
  point: { x: number; y: number };
};

export default ReactionEvent;
