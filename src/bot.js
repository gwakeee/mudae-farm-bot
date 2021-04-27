const Discord = require("discord.js-self");
const client = new Discord.Client();
const chalk = require("chalk");
const webhook = require("webhook-discord")
const Hook = new webhook.Webhook(cfg.configs.webhook_url)
const likelist = require("./likelist");
const cfg = require("./config.json");

function log(message) {
    console.log(chalk.red(cfg.log.prefix) + chalk.white(message));
}

async function react(message) {
    message.react("❤️");
}

log(`Connecting to account...`);

client.on("ready", () => {
    log(`Logged in ${client.user.tag}`);
    Hook.success(cfg.log.prefix,`Logged in ${client.user.tag}`)
});

client.on("message", (message) => {
    if (message.channel.id === cfg.configs.channel_id) {
        if (message.author.id === cfg.configs.mudae_id) {
            if (!message.embeds) return;

            message.embeds.forEach((embed) => {
                if (!embed.description) return;
                if (!embed.description.includes("claim")) {
                    for (var i = 0; i < likelist.length; i++) {
                        var obj = likelist[i];
                        if (embed.author) {
                            if (embed.author.name === obj) {
                                setTimeout(() => {
                                    react(message);
                                }, cfg.configs.catch_delay);
                                log(`I tried to catch "${obj}", please check out.`)
                                Hook.info(cfg.log.prefix,`I tried to catch "${obj}", please check out.`)
                                return;
                            }
                        }
                    }
                }
            });
        }
    }
});

client.login(cfg.account.token);
