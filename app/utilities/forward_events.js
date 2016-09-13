export function forwardEvents({ from, to, pattern = /.+/ }) {
  from.on(pattern, (eventData) => {
    to.trigger(eventData.eventName, [eventData]);;
  });
}
