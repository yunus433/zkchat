import fs from 'fs'

export const requestToDatabase = (req: {
  type: string,
  body: {
    user_public_key: string,
    chat_id: null | string,
    new_chat: null | {
      address: string,
      name: string,
      users: {
        publicKey: string,
        hash: string
      }[],
      lastMessage: null | {
        username: string,
        text: string,
        time: number
      }
    },
    new_message: null | {
      username: string,
      text: string,
      time: number
    }
  }
}, callback: Function) => {
  const data: {
    chats: {
      address: string,
      name: string,
      users: {
        publicKey: string,
        hash: string
      }[],
      lastMessage: null | {
        username: string,
        text: string,
        time: number
      }
    }[],
    messages: {
      [key: string]: {
        username: string,
        text: string,
        time: number
      }[]
    }
  } = JSON.parse(fs.readFileSync('./database.json', 'utf8'));

  if (req.type == 'get_chats') {
    return callback(null, data.chats.filter(each => each.users.find(user => user.publicKey == req.body.user_public_key)));
  } else if (req.type == 'post_chat') {
    if (!req.body.new_chat)
      return callback('bad_request');

    data.chats.push(req.body.new_chat);

    fs.writeFileSync('./database.json', JSON.stringify(data));

    return callback(null);
  } else if (req.type == 'get_messages') {
    if (!req.body.chat_id)
      return callback('bad_request');

    return callback(null, data.messages[req.body.chat_id]);
  } else if (req.type == 'post_message') {
    if (!req.body.chat_id || !req.body.new_message)
      return callback('bad_request');

    if (!data.messages[req.body.chat_id])
      data.messages[req.body.chat_id] = [req.body.new_message];
    else
      data.messages[req.body.chat_id].push(req.body.new_message);

    return callback(null);
  } else {
    return callback('bad_request');
  }
}
