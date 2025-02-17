import {playersDb} from "apis/mongo";
import {ioServer} from "apis/server";
import {getXpRequired} from "./getXpRequired";
import type {Player} from "models/Player";
import { eosApi } from "apis/eos";

const checkLevelUp = async (player: Player): Promise<void> => {
  const {name, socketId} = player;
  const xpRequired = getXpRequired(player.lv);

  if (player.xp <= xpRequired) { return; }

  const xp = player.xp - xpRequired;

  await playersDb.updateOne({name}, {
    $inc: {
      lv: 1
    },
    $set: {xp}
  });

  // await eosApi.transact({
  //   actions: [{
  //     account: "somgame11111",
  //     name: "flushtoken",
  //     authorization: [{
  //       actor: "somgame11111",
  //       permission: "active"
  //     }],
  //     data: {
  //       name, quantity: "1 DMTTEST"
  //     }
  //   }]
  // }, {
  //   blocksBehind: 3,
  //   expireSeconds: 30
  // })

  ioServer.to(socketId).emit("levelUp", {xp});
};

export {checkLevelUp};
