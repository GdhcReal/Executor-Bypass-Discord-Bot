//MADE BY WMND .gg/bypassi

const { Client } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const axios = require('axios')

const token = ""; //the bots token
const clientId = ""; //the bots client id
const botstatus = "" //bots custum status
const madeby = ""; //made by footer for example Made By {name} 
const apikey = ""; //api key get from https://discord.gg/SbhE6yTQ2g for free
const endpoint = "http://45.90.13.151:6041" //bypassi api endpoint ONLY CHANGE WHEN ANNOUNCEMENT

const client = new Client({ intents: 3276799 });
const rest = new REST({ version: '9' }).setToken(token);

const commands = [
    {
        name: 'delta',
        description: 'Gets Delta Key',
        options: [
            {
                name: 'link',
                type: 3,
                description: 'The Delta link',
                required: true,
            },
        ],
    },
    {
        name: 'hydrogen',
        description: 'Gets Hydrogen Key',
        options: [
            {
                name: 'link',
                type: 3,
                description: 'The Hydrogen link',
                required: true,
            },
        ],
    },
    {
        name: 'vegax',
        description: 'Gets VegaX Key',
        options: [
            {
                name: 'link',
                type: 3,
                description: 'The VegaX link',
                required: true,
            },
        ],
    },
    {
        name: 'fluxus',
        description: 'Gets Fluxus Key',
        options: [
            {
                name: 'link',
                type: 3,
                description: 'The Fluxus link',
                required: true,
            },
        ],
    },
];

client.once('ready', async () => {
    console.log(`\x1b[36mSuccessfully Logged In As ${client.user.username}\x1b[0m`);
    client.user.setPresence({
        activities: [{ name: botstatus}],
        status: 'dnd',
    });

    try {
        console.log('Started refreshing global application (/) commands.');
        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );
        console.log('Successfully reloaded global application (/) commands.');
    } catch (error) {
        console.error(error);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    switch (interaction.commandName) {
        case 'delta':
            await delta(interaction);
            break;
        case 'hydrogen':
            await hydrogen(interaction);
            break;
        case 'vegax':
            await vegax(interaction);
            break;
        case 'fluxus':
            await fluxus(interaction);
            break;
        default:
            break;
    }
});


async function delta(interaction) {
    const link = interaction.options.getString('link');
    const box = "```";

    await interaction.reply({
        embeds: [{
            title: "Getting Delta Key",
            "color": 587253,
            thumbnail: { url: 'https://media.discordapp.net/attachments/1160520088181542925/1199162006993895484/deltax.png?ex=663ad3a5&is=66398225&hm=0102ff78b7b4eb6b765b214a1685d53f6a4daf049fc9fd1ec8bfffa574238334&=&format=webp&quality=lossless' },
            fields: [
                { name: 'Status', value: '```Wait 0-15s```' }
            ]
        }],
    });

    if (link.startsWith('https://gateway.platoboost.com/a/8?id=')) {
        const urlParams = new URLSearchParams(new URL(link).search);
        const hwid = urlParams.get('id');
        const apiUrl = `${endpoint}/?url=${link}&apikey=${apikey}`;

        try {
            const response = await axios.get(apiUrl);
            const json = response.data;

            if (json.status === "success") {
                await interaction.editReply({
                    embeds: [{
                        title: "Success",
                        "color": 458532,
                        thumbnail: { url: 'https://media.discordapp.net/attachments/1160520088181542925/1199162006993895484/deltax.png?ex=663ad3a5&is=66398225&hm=0102ff78b7b4eb6b765b214a1685d53f6a4daf049fc9fd1ec8bfffa574238334&=&format=webp&quality=lossless' },
                        fields: [
                            { name: 'Key:', value: `${box}${json.key}${box}` },
                            { name: 'HWID:', value: `${box}yaml\n${hwid}\n${box}` },
                            { name: 'Key Time Left:', value: `${box}${json.timeleft}${box}` },
                            { name: 'Time Taken:', value: `${box}${json.time}${box}` }
                        ],
                        footer: {
                            text: `Requested By ${interaction.user.username} | Made by ${madeby}`
                        }
                    }],
                });            
            } else {
                await interaction.editReply({
                    embeds: [{
                        title: "Failed To Get Delta Key",
                        "color": 16713222,
                        thumbnail: { url: 'https://media.discordapp.net/attachments/1160520088181542925/1199162006993895484/deltax.png?ex=663ad3a5&is=66398225&hm=0102ff78b7b4eb6b765b214a1685d53f6a4daf049fc9fd1ec8bfffa574238334&=&format=webp&quality=lossless' },
                        fields: [
                            { name: 'Status:', value: '```ml\nEither Hwid Is Invalid Or Api Is Not Working.\n```' },
                            { name: 'HWID:', value: `${box}${hwid}${box}` }
                        ],
                        footer: {
                            text: `Requested By ${interaction.user.username} | Made by ${madeby}`
                        }
                    }],
                });                       
            }
        } catch (error) {
            console.error(error);
            await interaction.editReply({
                embeds: [{
                    title: "Failed To Get Delta key",
                    "color": 16713222,
                    thumbnail: { url: 'https://media.discordapp.net/attachments/1160520088181542925/1199162006993895484/deltax.png?ex=663ad3a5&is=66398225&hm=0102ff78b7b4eb6b765b214a1685d53f6a4daf049fc9fd1ec8bfffa574238334&=&format=webp&quality=lossless' },
                    fields: [
                        { name: 'Status:', value: '```ml\nEither Api Is Ofline Or Not Responding.\n```' },
                    ],
                    footer: {
                        text: `Requested By ${interaction.user.username} | Made by ${madeby}`
                    }
                }],
            });         
        }
    } else {
        await interaction.editReply({
            embeds: [{
                title: "Invalid Delta Link",
                "color": 16713222,
                fields: [
                    { name: 'Link', value: `${box}${link}${box}` }
                ]
            }]
        });
    }
}

async function hydrogen(interaction) {
    const link = interaction.options.getString('link');
    const box = "```";

    await interaction.reply({
        embeds: [{
            title: "Getting Hydrogen Key",
            "color": 587253,
            thumbnail: { url: 'https://hydrogenexec.com/wp-content/uploads/2024/02/logo-hydrogen-executor.webp' },
            fields: [
                { name: 'Status', value: '```Wait 0-15s```' }
            ]
        }],
    });

    if (link.startsWith('https://gateway.platoboost.com/a/2569?id=')) {
        const urlParams = new URLSearchParams(new URL(link).search);
        const hwid = urlParams.get('id');
        const apiUrl = `${endpoint}/?url=${link}&apikey=${apikey}`;

        try {
            const response = await axios.get(apiUrl);
            const json = response.data;

            if (json.status === "success") {
                await interaction.editReply({
                    embeds: [{
                        title: "Success",
                        "color": 458532,
                        thumbnail: { url: 'https://hydrogenexec.com/wp-content/uploads/2024/02/logo-hydrogen-executor.webp' },
                        fields: [
                            { name: 'Key:', value: `${box}${json.key}${box}` },
                            { name: 'HWID:', value: `${box}yaml\n${hwid}\n${box}` },
                            { name: 'Key Time Left:', value: `${box}${json.timeleft}${box}` },
                            { name: 'Time Taken:', value: `${box}${json.time}${box}` }
                        ],
                        footer: {
                            text: `Requested By ${interaction.user.username} | Made by ${madeby}`
                        }
                    }],
                });            
            } else {
                await interaction.editReply({
                    embeds: [{
                        title: "Failed To Get Hydrogen Key",
                        "color": 16713222,
                        thumbnail: { url: 'https://hydrogenexec.com/wp-content/uploads/2024/02/logo-hydrogen-executor.webp' },
                        fields: [
                            { name: 'Status:', value: '```ml\nEither Hwid Is Invalid Or Api Is Not Working.\n```' },
                            { name: 'HWID:', value: `${box}${hwid}${box}` }
                        ],
                        footer: {
                            text: `Requested By ${interaction.user.username} | Made by ${madeby}`
                        }
                    }],
                });                       
            }
        } catch (error) {
            console.error(error);
            await interaction.editReply({
                embeds: [{
                    title: "Failed To Get Hydrogen key",
                    "color": 16713222,
                    thumbnail: { url: 'https://hydrogenexec.com/wp-content/uploads/2024/02/logo-hydrogen-executor.webp' },
                    fields: [
                        { name: 'Status:', value: '```ml\nEither Api Is Ofline Or Not Responding.\n```' },
                    ],
                    footer: {
                        text: `Requested By ${interaction.user.username} | Made by ${madeby}`
                    }
                }],
            });         
        }
    } else {
        await interaction.editReply({
            embeds: [{
                title: "<a:no2:1240837393419079711>Invalid Hydrogen Link",
                "color": 16713222,
                fields: [
                    { name: 'Link', value: `${box}${link}${box}` }
                ]
            }]
        });
    }
}

async function vegax(interaction) {
    const link = interaction.options.getString('link');
    const box = "```";

    await interaction.reply({
        embeds: [{
            title: "Getting VegaX Key",
            "color": 587253,
            thumbnail: { url: 'https://media.discordapp.net/attachments/1206325472254894191/1206326594537525288/vega.png?ex=6637e330&is=663691b0&hm=9ef8e240b723799a40795aacbb2de6e5384a342d0c9396da0f64524ace96ca2d&=&format=webp&quality=lossless&width=408&height=417' },
            fields: [
                { name: 'Status', value: '```Wait 0-30s```' }
            ]
        }],
    });

    if (link.startsWith('https://pandadevelopment.net/getkey?service=vegax&hwid=')) {
        const encodedLink = (encodeURI(link))
        const urlParams = new URLSearchParams(new URL(link).search);
        const hwid = urlParams.get('hwid');
        const apiUrl = `${endpoint}/?url=${encodedLink}&apikey=${apikey}`;

        try {
            const response = await axios.get(apiUrl);
            const json = response.data;

            if (json.status === "success") {
                await interaction.editReply({
                    embeds: [{
                        title: "Success",
                        "color": 458532,
                        thumbnail: { url: 'https://media.discordapp.net/attachments/1206325472254894191/1206326594537525288/vega.png?ex=6637e330&is=663691b0&hm=9ef8e240b723799a40795aacbb2de6e5384a342d0c9396da0f64524ace96ca2d&=&format=webp&quality=lossless&width=408&height=417' },
                        fields: [
                            { name: 'Key:', value: `${box}${json.key}${box}` },
                            { name: 'HWID:', value: `${box}yaml\n${hwid}\n${box}` },
                            { name: 'Time Taken:', value: `${box}${json.time}${box}` }
                        ],
                        footer: {
                            text: `Requested By ${interaction.user.username} | Made by ${madeby}`
                        }   
                    }],
                });            
            } else {
                await interaction.editReply({
                    embeds: [{
                        title: "Failed To Get VegaX Key",
                        "color": 16713222,
                        thumbnail: { url: 'https://media.discordapp.net/attachments/1206325472254894191/1206326594537525288/vega.png?ex=6637e330&is=663691b0&hm=9ef8e240b723799a40795aacbb2de6e5384a342d0c9396da0f64524ace96ca2d&=&format=webp&quality=lossless&width=408&height=417' },
                        fields: [
                            { name: 'Status:', value: '```ml\nEither Hwid Is Invalid Or Api Is Not Working.ml\n```' },
                            { name: 'HWID:', value: `${box}${hwid}${box}` }
                        ],
                        footer: {
                            text: `Requested By ${interaction.user.username} | Made by ${madeby}`
                        }
                    }],
                });                       
            }
        } catch (error) {
            console.error(error);
            await interaction.editReply({
                embeds: [{
                    title: "<a:no2:1240837393419079711>Failed To Get VegaX key",
                    "color": 16713222,
                    thumbnail: { url: 'https://media.discordapp.net/attachments/1206325472254894191/1206326594537525288/vega.png?ex=6637e330&is=663691b0&hm=9ef8e240b723799a40795aacbb2de6e5384a342d0c9396da0f64524ace96ca2d&=&format=webp&quality=lossless&width=408&height=417' },
                    fields: [
                        { name: 'Status:', value: '```ml\nEither Api Is Ofline Or Not Responding.ml\n```' },
                    ],
                    footer: {
                        text: `Requested By ${interaction.user.username} | Made by ${madeby}`
                    }
                }],
            });         
        }
    } else {
        await interaction.editReply({
            embeds: [{
                title: "Invalid VegaX Link",
                "color": 16713222,
                fields: [
                    { name: 'Link', value: `${box}${link}${box}` }
                    ],
                footer: {
                        text: `Requested By ${interaction.user.username} | Made by ${madeby}`
                }
            }]
        });
    }
}

async function fluxus(interaction) {
    const link = interaction.options.getString('link');
    const box = "```";

    await interaction.reply({
        embeds: [{
            title: "Getting Fluxus Key",
            "color": 587253,
            thumbnail: { url: 'https://media.discordapp.net/attachments/1205456615873052712/1239947639165026366/2558-fluxus.png?ex=664769ba&is=6646183a&hm=2cee59399595d0f73a9fdc0faab234430cdb183a24890d5c8d550db3b4747de1&=&format=webp&quality=lossless' },
            fields: [
                { name: 'Status', value: '```Please wait 0-10s```' }
            ]
        }],
    });

    if (link.startsWith('https://flux.li/android/external/start.php?HWID=')) {
        const urlParams = new URLSearchParams(new URL(link).search);
        const HWID = urlParams.get('HWID');
        const apiUrl = `${endpoint}/?url=${link}&apikey=${apikey}`;

        try {
            const response = await axios.get(apiUrl);
            const json = response.data;

            if (json.status === "success") {
                await interaction.editReply({
                    embeds: [{
                        title: "Success",
                        "color": 458532,
                        thumbnail: { url: 'https://media.discordapp.net/attachments/1205456615873052712/1239947639165026366/2558-fluxus.png?ex=664769ba&is=6646183a&hm=2cee59399595d0f73a9fdc0faab234430cdb183a24890d5c8d550db3b4747de1&=&format=webp&quality=lossless' },
                        fields: [
                            { name: 'Key:', value: `${box}${json.key}${box}` },
                            { name: 'HWID:', value: `\`\`\`yaml\n${HWID}\n\`\`\`` },
                            { name: 'Time Taken:', value: `${box}${json.time}${box}` }
                        ],
                        footer: {
                            text: `Requested By ${interaction.user.username} | Made by ${madeby}`
                        }
                    }],
                });            
            } else {
                await interaction.editReply({
                    embeds: [{
                        title: "Error",
                        "color": 16713222,
                        thumbnail: { url: 'https://media.discordapp.net/attachments/1205456615873052712/1239947639165026366/2558-fluxus.png?ex=664769ba&is=6646183a&hm=2cee59399595d0f73a9fdc0faab234430cdb183a24890d5c8d550db3b4747de1&=&format=webp&quality=lossless' },
                        fields: [
                            { name: 'Status:', value: '```ml\nMost Likely An Invalid HWID/Fluxus Link Or Failed To Bypass. Please Try Again With A Valid Link.\n```' },
                            { name: 'HWID:', value: `${box}ml\n${HWID}\n${box}` }
                        ],
                        footer: {
                            text: `Requested By ${interaction.user.username} | Made by ${madeby}`
                        }
                    }],
                });                       
            }
        }catch (error) {
            console.error(error);
            await interaction.editReply({
                embeds: [{
                    title: "Failed To Get Fluxus key",                   
                    "color": 16713222,
                    thumbnail: { url: 'https://media.discordapp.net/attachments/1205456615873052712/1239947639165026366/2558-fluxus.png?ex=664769ba&is=6646183a&hm=2cee59399595d0f73a9fdc0faab234430cdb183a24890d5c8d550db3b4747de1&=&format=webp&quality=lossless' },
                    fields: [
                        { name: '<a:__:1240837832566771742>Status:', value: '```ml\nEither Api Is Ofline Or Not Responding.\n```' },
                    ],
                    footer: {
                        text: `Requested By ${interaction.user.username} | Made by ${madeby}`
                    }
                }],
            });         
        }
    } else {
        await interaction.editReply({
            embeds: [{
                title: "Invalid Fluxus Link",
                "color": 16713222,
                fields: [
                    { name: 'Link', value: `${box}${link}${box}` }
                    ],
                    footer: {
                        text: `Requested By ${interaction.user.username} | Made by ${madeby}`
               }
            }]
        });
    }
}

client.login(token);
