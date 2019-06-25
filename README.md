# Nebula4x Web UI

This is the primary Web UI built for the [Nebula4x](https://github.com/edouardpoitras/nebula4x) game.

DISCLAIMER: This was my first React project and can be a bit hard on the eyes if you dive too deep in the code :)
The code has not received the proper GitHub publishing pass, so no documentation and some ugly code here-and-there.

## Running

Once you have the server running, you can fire up the UI with the following command:

    npm start

A browser window should open with the game page.

## Todo

- Desperately need to switch over to TypeScript.
- Need a better implementation, understanding, and use of the FabricJS components.

## Issues

When running `npm run dev` you may encounter a "No space left on device" error.
This could be related to the inotify file limits. Try:

    sudo sysctl fs.inotify.max_user_watches=9999999