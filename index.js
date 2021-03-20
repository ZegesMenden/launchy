const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.DISCORD_BOT_SECRET;
const keep_alive = require('./alive.js');
const axios = require('axios');

client.on('ready', () => {
  console.log('running /');
  /*async function getCommands(){
    let commands = await client.api.applications(client.user.id).commands.get();
    console.log(commands);
    let req = await client.api.applications(client.user.id).commands(`821812491859787777`).delete()
    return req;
  }
  getCommands();*/

  client.api.applications(client.user.id).commands.post({
    data: {
      name: "poll",
      description: "Start a poll!",
      options: [
        {
        name: "question",
        description: "what do you want to poll?",
        type: 3
        }
      ]
    }
  })

  client.api.applications(client.user.id).commands.post({
    data: {
      name: "status",
      description: "Next launch status",
    }
  })

  client.api.applications(client.user.id).commands.post({
    data: {
      name: "help",
      description: "Need some help?"
    }
  })

  client.api.applications(client.user.id).commands.post({
    data: {
      name: "link",
      description: "Share the link!"
    }
  })

  client.api.applications(client.user.id).commands.post({
    data: {
      name: "poll",
      description: "Start a poll!",
      options: [{
        name: "question",
        description: "what do you want to poll?",
        type: 3
      }]
    }
  })

  client.api.applications(client.user.id).commands.post({
    data: {
      name: "feature",
      description: "What features do you want to see?",
      options: [
        {
          name: "feature",
          description: "please list the feature you want.",
          type: 3
        }
      ]
    }
  })

  client.api.applications(client.user.id).commands.post({
    data: {
      name: "update",
      description: "Update the API",

      options: [
        {
          name: "event",
          description: "change the event name",
          type: 3
        },
        {
          name: "status",
          description: "change the status",
          type: 3
        },
        {
          name: "description",
          description: "change the status",
          type: 3
        },
        {
          name: "net",
          description: "change the NET time",
          type: 3
        },
        {
          name: "vehicle",
          description: "change the vehicle name",
          type: 3
        },
        {
          name: "stages",
          description: "change the vehicle stages",
          type: 3
        },
        {
          name: "sn",
          description: "change the booster serial number",
          type: 3
        },
        {
          name: "flightproven",
          description: "is the booster flight proven?",
          type: 3
        },
        {
          name: "previousflights",
          description: "how many flights does the booster have?",
          type: 3
        },
        {
          name: "other",
          description: "any other notes?",
          type: 3
        },
      ]
    }
  })

  client.ws.on('INTERACTION_CREATE', async interaction => {
    const command = interaction.data.name.toLowerCase();
    const args = interaction.data.options;

    if(command == "feature"){
      const dat = args.find(arg => arg.name.toLowerCase() == "feature").value;
      client.channels.cache.get('822179822095695873').send(`${dat}`);

      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: 'Added! The devs will review it, and add it soon.'
          }
        }
      })
    }

    if(command == "help"){
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: `help is on the way!`
          }
        }
      })

      const helpEmbed = new Discord.MessageEmbed()
        .setColor('#7289da')
        .setTitle("Here's what you can do:")
        .setAuthor('Launchy', 'https://github.com/itslaunchtime/resources/blob/main/launchy.png?raw=true', 'https://itslaunchti.me/launchy')
        .addFields(
          { name: '/status', value: 'Gets the status of the latest launch.', inline: true },
          { name: '/link', value: 'Sends the link to the site!', inline: true },
          { name: '/feature', value: "Let's the devs know you have something to say.", inline: true },
          { name: '\u200B', value: '\u200B' },
          { name: '/poll', value: 'Starts a poll and mentions the polls role.', inline: true },
          { name: '/update', value: '[CONTRIBUTORS ONLY] allows you to update the API.', inline: true },
          { name: '/help', value: 'Sends this embed!', inline: true },
        )
      
      function sendHelp(){
        client.channels.cache.get(interaction.channel_id).send(helpEmbed);
      }

      setTimeout(sendHelp, 1000);
    }

    if(command == "poll"){
      const dat = args.find(arg => arg.name.toLowerCase() == "question").value;

      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: '<@&822597312051544105>'
          }
        }
      })

      const pollEmbed = new Discord.MessageEmbed()
        .setTitle(`Poll from ${interaction.member.nick}!`)
        .setDescription(dat)
      
      function sendPoll(){
        client.channels.cache.get(interaction.channel_id).send(pollEmbed).then(embedMessage => {
          embedMessage.react("👍");
          embedMessage.react("👎");
        });
      }

      setTimeout(sendPoll, 1000);
    }

    if(command == "link"){
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: 'https://itslaunchti.me/'
          }
        }
      })
    }

    if(command == "link"){
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: 'https://itslaunchti.me/'
          }
        }
      })
    }

    if(command == "status"){
      async function getData() {
        const response = await axios.get(`https://api.itslaunchti.me/v1/data`)
        if(response.data.status !== ''){
          client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
              type: 4,
              data: {
                content: `${response.data.status}`
              }
            }
          })
        }
        else {
          client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
              type: 4,
              data: {
                content: 'Error! https://itslaunchti.me/'
              }
            }
          })
        }
      }
      getData();
    }

    if(command == "update"){
      if(interaction.member.roles.includes({contributor role id})){
        var count = Object.keys(args).length;
        for (i = 0; i < count; i++){
          if(args[i].name === "status"){
            const dat = args.find(arg => arg.name.toLowerCase() == "status").value;
            axios.post(`https://api.itslaunchti.me/update-status?auth=${process.env.AUTHCODE}`, {
              dat: `${dat}`
            })
          }
          if(args[i].name === "event"){
            const dat = args.find(arg => arg.name.toLowerCase() == "event").value;
            axios.post(`https://api.itslaunchti.me/update-event?auth=${process.env.AUTHCODE}`, {
              dat: `${dat}`
            })
          }
          if(args[i].name === "description"){
            const dat = args.find(arg => arg.name.toLowerCase() == "description").value;
            axios.post(`https://api.itslaunchti.me/update-description?auth=${process.env.AUTHCODE}`, {
              dat: `${dat}`
            })
          }

          if(args[i].name === "net"){
            const dat = args.find(arg => arg.name.toLowerCase() == "net").value;
            axios.post(`https://api.itslaunchti.me/update-net?auth=${process.env.AUTHCODE}`, {
              dat: `${dat}`
            })
          }

          if(args[i].name === "vehicle"){
            const dat = args.find(arg => arg.name.toLowerCase() == "vehicle").value;
            axios.post(`https://api.itslaunchti.me/update-vehicle?auth=${process.env.AUTHCODE}`, {
              dat: `${dat}`
            })
          }

          if(args[i].name === "stages"){
            const dat = args.find(arg => arg.name.toLowerCase() == "stages").value;
            axios.post(`https://api.itslaunchti.me/update-stages?auth=${process.env.AUTHCODE}`, {
              dat: `${dat}`
            })
          }

          if(args[i].name === "sn"){
            const dat = args.find(arg => arg.name.toLowerCase() == "sn").value;
            axios.post(`https://api.itslaunchti.me/update-sn?auth=${process.env.AUTHCODE}`, {
              dat: `${dat}`
            })
          }

          if(args[i].name === "flightproven"){
            const dat = args.find(arg => arg.name.toLowerCase() == "flightproven").value;
            axios.post(`https://api.itslaunchti.me/update-flightproven?auth=${process.env.AUTHCODE}`, {
              dat: `${dat}`
            })
          }

          if(args[i].name === "previousflights"){
            const dat = args.find(arg => arg.name.toLowerCase() == "previousflights").value;
            axios.post(`https://api.itslaunchti.me/update-previousflights?auth=${process.env.AUTHCODE}`, {
              dat: `${dat}`
            })
          }

          if(args[i].name === "other"){
            const dat = args.find(arg => arg.name.toLowerCase() == "other").value;
            axios.post(`https://api.itslaunchti.me/update-other?auth=${process.env.AUTHCODE}`, {
              dat: `${dat}`
            })
          }

        }
        client.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
            type: 4,
            data: {
              content: `Updated!`
            }
          }
        })
      } else {
        client.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
            type: 4,
            data: {
              content: `not a contributor`
            }
          }
        })
      }
    }
  })
});

client.login(token);
