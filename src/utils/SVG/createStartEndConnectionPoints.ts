import { Agent } from '../../types/agent';
import { Point } from '../../types/draw';

/*
  Takes in two agent objects and uses their position and size to calculate which side
  the line should start and end on
*/
export const calculateStartAndEndPoints = (
  startAgent: Agent,
  endAgent: Agent
): { startPoint: Point; endPoint: Point } => {
  const startCenter: Point = {
    x: startAgent.position.x + startAgent.size.width / 2,
    y: startAgent.position.y + startAgent.size.height / 2
  };
  const endCenter: Point = {
    x: endAgent.position.x + endAgent.size.width / 2,
    y: endAgent.position.y + endAgent.size.height / 2
  };

  const getMiddlePoint = (
    agent: Agent,
    side: 'left' | 'right' | 'top' | 'bottom'
  ): Point => {
    switch (side) {
      case 'left':
        return {
          x: agent.position.x,
          y: agent.position.y + agent.size.height / 2
        };
      case 'right':
        return {
          x: agent.position.x + agent.size.width,
          y: agent.position.y + agent.size.height / 2
        };
      case 'top':
        return {
          x: agent.position.x + agent.size.width / 2,
          y: agent.position.y
        };
      case 'bottom':
        return {
          x: agent.position.x + agent.size.width / 2,
          y: agent.position.y + agent.size.height
        };
    }
  };

  const dx = endCenter.x - startCenter.x;
  const dy = endCenter.y - startCenter.y;

  const startPoint =
    Math.abs(dx) > Math.abs(dy)
      ? getMiddlePoint(startAgent, dx > 0 ? 'right' : 'left')
      : getMiddlePoint(startAgent, dy > 0 ? 'bottom' : 'top');

  const endPoint =
    Math.abs(dx) > Math.abs(dy)
      ? getMiddlePoint(endAgent, dx > 0 ? 'left' : 'right')
      : getMiddlePoint(endAgent, dy > 0 ? 'top' : 'bottom');

  return { startPoint, endPoint };
};
