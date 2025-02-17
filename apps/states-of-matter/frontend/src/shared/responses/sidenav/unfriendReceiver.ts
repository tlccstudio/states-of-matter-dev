import {socketService} from "services";
import {accountStore, playerStore, socialStore} from "stores";

export const unfriendReceiver = () => {
  const {socket} = socketService;

  socket.on("unfriendReceiver", (params) => {
    const {username} = params;

    accountStore.update((store) => {
      const {chat, friends} = store.social;
      const friend = friends.find((friend) => friend.username === username);
      const i = friends.indexOf(friend);

      friends.splice(i, 1);

      if (chat.username === username) {
        chat.isOpen = false;
      }

      return store;
    });

    // playerStore.update((player) => {
    //   const {friends} = player.social;
    //   const i = friends.indexOf(username);

    //   friends.splice(i, 1);

    //   return player;
    // });

    // socialStore.update((store) => {
    //   const {chat, friends} = store;
    //   const friend = friends.find((friend) => friend.username === username);
    //   const i = friends.indexOf(friend);

    //   friends.splice(i, 1);

    //   if (chat.username === username) { chat.isOpen = false; }

    //   return store;
    // });
  });
};
