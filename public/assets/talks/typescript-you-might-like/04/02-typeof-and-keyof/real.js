const eventHandlers = {
  click: (e: MouseEvent) => {},
  keypress: (e: KeyboardEvent) => {},
  scroll: (e: UIEvent) => {}
};

type EventType = keyof typeof eventHandlers;
type EventHandler<T extends EventType> = typeof eventHandlers[T];

function addEventListener<T extends EventType>(
  type: T,
  handler: EventHandler<T>
) {
  // Implementation
}
