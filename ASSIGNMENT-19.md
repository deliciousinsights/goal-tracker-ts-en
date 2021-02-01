# Assignment for step 19: `notify()` utility

We're going to us the [Web Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API) to implement our `notify()` utility function in `src/lib/clock.ts`.

It accepts a few options and we need to implement the following contract:

- The notification must use the provided title, text body and icon
- It must be _tagged_ with value `'goal-tracker'` to avoid overwhelming the notification center should it be called in rapid-fire.
- It must declare its language as English (option `lang`, code `'en'`)
- On browsers that support the notifications’ `close()` method\*, it should implement the `secondsVisible` option when it is greater than zero:
  - That delay, in seconds, starts when the notification is indeed visible (`show` event is triggered)
  - When the delay elapses, the notification is closed using `close()`
  - To ensure the notification then doesn't auto-close earlier, it's told not to (option `requireInteraction` set to `true`).

_\* You can determine whether this method exist **before** instantiating a `Notification` using the following test:_

```js
typeof Notification.prototype.close === 'function'
```
