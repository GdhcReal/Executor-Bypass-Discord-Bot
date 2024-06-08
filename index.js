//Made by wmnd
const { Client } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const token = "";
const clientId = "";
const botstatus = "";
const madeby = "";
const endpoint = "http://45.90.13.151:6041"

const client = new Client({ intents: 3276799 });
const rest = new REST({ version: '9' }).setToken(token);

const commands = [
    {
        name: 'bypass',
        description: 'Bypass Links You Enter',
        options: [
            {
                name: 'link',
                type: 3,
                description: 'The link',
                required: true,
            },
        ],
    },
    {
        name: 'supported',
        description: 'Gets Supported List',
    },
    {
        name: 'apistatus',
        description: 'Gets The Api Status',
    },
];

client.once('ready', async () => {
    console.log(`\x1b[36mSuccessfully Logged In As ${client.user.username}\x1b[0m`);

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

    client.user.setPresence({
        activities: [{ name: botstatus }],
        status: 'dnd',
    });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    switch (interaction.commandName) {
        case 'bypass':
            await bypass(interaction);
            break;
        case 'supported':
            await supported(interaction);
            break;
        case 'apistatus':
            await apistatus(interaction);
            break;
        default:
            break;
    }
});


async function bypass(interaction) {
    const link = interaction.options.getString('link');
    const box = "```";
    
    if (!link.startsWith("https://gateway.platoboost.com/a/") &&
        !link.startsWith("https://flux.li/android/external/start.php?HWID=") &&
        !link.startsWith("https://linkvertise.com")) {
        await interaction.reply({
            embeds: [{
                title: "Unsupported Link",
                color: 16713222,
                fields: [
                    { name: 'Message:', value: '```ml\nRun /supported To Get The List Of Supported Bypasses.\n```' },
                ],
                footer: {
                    text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By Bypassi`
                }
            }],
        });  
        return;
    }
    
    await interaction.reply({
        embeds: [{
            title: "Bypassing..",
            color: 587253,
            fields: [
                { name: 'Status', value: '```Could Take A Few Seconds Depending On What Its Trying To Bypass```' }
            ],
            footer: {
                text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By Bypassi`
            }
        }],
    });

    if (link.startsWith('https://gateway.platoboost.com/a/')) {
        const urlparam = new URLSearchParams(new URL(link).search);
        const hwid = urlparam.get('id');
        const apiUrl = `${endpoint}/?url=${link}`;

        try {
            const response = await axios.get(apiUrl);
            const json = response.data;

            if (json.status === "success") {
                await interaction.editReply({
                    embeds: [{
                        title: "PlatoBoost Bypass",
                        color: 458532,
                        thumbnail: { url: 'https://gateway.platoboost.com/icon.svg' },
                        fields: [
                            { name: 'Key:', value: `${box}${json.key}${box}` },
                            { name: 'HWID:', value: `${box}yaml\n${hwid}\n${box}` },
                            { name: 'Key Time Left:', value: `${box}${json.timeleft}${box}` },
                            { name: 'Time Taken:', value: `${box}${json.time}${box}` }
                        ],
                        footer: {
                            text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By Bypassi`
                        }
                    }],
                });     
            } else if (json.status === "fail" && json.message === "Most Likely An Invalid PlatoBoost Link Or Un-Existing Author.") {
                await interaction.editReply({
                    embeds: [{
                        title: "Failed To Get PlatoBoost Key",
                        color: 16713222,
                        thumbnail: { url: 'https://gateway.platoboost.com/icon.svg' },
                        fields: [
                            { name: 'Message:', value: '```ml\nMost Likely An Invalid PlatoBoost Link Or Un-Existing Author.\n```' },
                        ],
                        footer: {
                            text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By Bypassi`
                        }
                    }],
                });                              
            } else {
                await interaction.editReply({
                    embeds: [{
                        title: "PlatoBoost Error",
                        color: 16713222,
                        thumbnail: { url: 'https://gateway.platoboost.com/icon.svg' },
                        fields: [
                            { name: 'Message:', value: '```ml\nEither Hwid Is Invalid Or Api Is Not Working.\n```' },
                        ],
                        footer: {
                            text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By Bypassi`
                        }
                    }],
                });                       
            }
        } catch (error) {
            console.error(error);
            await interaction.editReply({
                embeds: [{
                    title: "PlatoBoost Error",
                    color: 16713222,
                    thumbnail: { url: 'https://media.discordapp.net/attachments/1160520088181542925/1199162006993895484/deltax.png?ex=663ad3a5&is=66398225&hm=0102ff78b7b4eb6b765b214a1685d53f6a4daf049fc9fd1ec8bfffa574238334&=&format=webp&quality=lossless' },
                    fields: [
                        { name: 'Message:', value: '```ml\nEither Api Is Offline Or Not Responding.\n```' },
                    ],
                    footer: {
                        text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By Bypassi`
                    }
                }],
            });         
        }
    } else if (link.startsWith('https://flux.li/android/external/start.php?HWID=')) {
        const urlParams = new URLSearchParams(new URL(link).search);
        const HWID = urlParams.get('HWID');
        const apiUrl = `${endpoint}/?url=${link}`;

        try {
            const response = await axios.get(apiUrl);
            const json = response.data;

            if (json.status === "success") {
                await interaction.editReply({
                    embeds: [{
                        title: "Fluxus Bypass",
                        color: 458532,
                        thumbnail: { url: 'https://media.discordapp.net/attachments/1205456615873052712/1239947639165026366/2558-fluxus.png?ex=664769ba&is=6646183a&hm=2cee59399595d0f73a9fdc0faab234430cdb183a24890d5c8d550db3b4747de1&=&format=webp&quality=lossless' },
                        fields: [
                            { name: 'Key:', value: `${box}${json.key}${box}` },
                            { name: 'HWID:', value: `${box}yaml\n${HWID}\n${box}` },
                            { name: 'Time Taken:', value: `${box}${json.time}${box}` }
                        ],
                        footer: {
                            text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By Bypassi`
                        }
                    }],
                });            
            } else {
                await interaction.editReply({
                    embeds: [{
                        title: "Fluxus Error",
                        color: 16713222,
                        thumbnail: { url: 'https://media.discordapp.net/attachments/1205456615873052712/1239947639165026366/2558-fluxus.png?ex=664769ba&is=6646183a&hm=2cee59399595d0f73a9fdc0faab234430cdb183a24890d5c8d550db3b4747de1&=&format=webp&quality=lossless' },
                        fields: [
                            { name: 'Message:', value: '```ml\nMost Likely An Invalid HWID/Fluxus Link Or Failed To Bypass. Please Try Again With A Valid Link.\n```' },
                        ],
                        footer: {
                            text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By Bypassi`
                        }
                    }],
                });                       
            }
        } catch (error) {
            console.error(error);
            await interaction.editReply({
                embeds: [{
                    title: "Fluxus Error",                   
                    color: 16713222,
                    thumbnail: { url: 'https://media.discordapp.net/attachments/1205456615873052712/1239947639165026366/2558-fluxus.png?ex=664769ba&is=6646183a&hm=2cee59399595d0f73a9fdc0faab234430cdb183a24890d5c8d550db3b4747de1&=&format=webp&quality=lossless' },
                    fields: [
                        { name: 'Message:', value: '```ml\nEither Api Is Offline Or Not Responding.\n```' },
                    ],
                    footer: {
                        text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By Bypassi`
                    }
                }],
            });         
        }      
    } else if (link.startsWith('https://linkvertise.com')) {
        const apiUrl = `${endpoint}/?url=${link}`;

        try {
            const response = await axios.get(apiUrl);
            const json = response.data;

            if (json.status === "success") {
                await interaction.editReply({
                    embeds: [{
                        title: "Linkvertise Bypass",
                        color: 458532,
                        thumbnail: { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDXWPxWgfrFsPT9M9NzG2PLeMg3nWE5LkAIw&s' },
                        fields: [
                            { name: 'Direct URL:', value: `${json.target}` },
                            { name: 'Time Taken:', value: `${box}${json.time}${box}` }
                        ],
                        footer: {
                            text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By Bypassi`
                        }
                    }],
                });           
            } else if (json.status === "fail" && json.message === "Invalid Linkvertise Link. Try Again With An Active/Working Linkvertise Link") {
                await interaction.editReply({
                    embeds: [{
                        title: "Linkvertise Error",
                        color: 16713222,
                        thumbnail: { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDXWPxWgfrFsPT9M9NzG2PLeMg3nWE5LkAIw&s' },
                        fields: [
                            { name: 'Message:', value: '```ml\nInvalid Linkvertise Link. Try Again With An Active/Working Linkvertise Link.\n```' },
                        ],
                        footer: {
                            text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By Bypassi`
                        }
                    }],
                });  
            } else {
                await interaction.editReply({
                    embeds: [{
                        title: "Linkvertise Error",
                        color: 16713222,
                        thumbnail: { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDXWPxWgfrFsPT9M9NzG2PLeMg3nWE5LkAIw&s' },
                        fields: [
                            { name: 'Message:', value: '```ml\nMost Likely An Api Error. Try Again Later!\n```' },
                        ],
                        footer: {
                            text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By Bypassi`
                        }
                    }],
                });                       
            }
        } catch (error) {
            console.error(error);
            await interaction.editReply({
                embeds: [{
                    title: "Linkvertise Error",                   
                    color: 16713222,
                    thumbnail: { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDXWPxWgfrFsPT9M9NzG2PLeMg3nWE5LkAIw&s' },
                    fields: [
                        { name: 'Message:', value: '```ml\nEither Api Is Offline Or Not Responding.\n```' },
                    ],
                    footer: {
                        text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By Bypassi`
                    }
                }],
            });         
        }

    }
}

async function supported(interaction) {
    await interaction.reply({
        embeds: [{
            title: "Supported Bypasses",
            color: 3447003,
            fields: [
                { name: 'Supported Links:', value: '```md\n1. [PlatoBoost](https://gateway.platoboost.com/a/)\n2. [Fluxus](https://flux.li/android/external/start.php?HWID=)\n3. [Linkvertise](https://linkvertise.com)\n```' }
            ],
            footer: {
                text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By Bypassi`
            },
            timestamp: new Date()
        }],
    });
}

async function apistatus(interaction) {
    const statusUrl = 'http://45.90.13.151:6041/status';

    try {
        const response = await axios.get(statusUrl);
        const data = response.data;

        if (data.status === 'online') {
            await interaction.reply({
                embeds: [{
                    title: "API Status",
                    color: 3066993,
                    fields: [
                        { name: 'Ping:', value: `\`${data.ping} ms\``, inline: true },
                        { name: 'Uptime:', value: `\`${data.uptime}\``, inline: true }
                    ],
                    footer: {
                        text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By Bypassi`
                    },
                    timestamp: new Date()
                }],
            });
        } else {
            await interaction.reply({
                embeds: [{
                    title: "API Status",
                    color: 15158332,
                    fields: [
                        { name: 'Status:', value: 'The API is currently offline.' }
                    ],
                    footer: {
                        text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By Bypassi`
                    },
                    timestamp: new Date()
                }],
            });
        }
    } catch (error) {
        console.error(error);
        await interaction.reply({
            embeds: [{
                title: "API Status",
                color: 15158332,
                fields: [
                    { name: 'Message:', value: 'Failed to retrieve the API status.' },
                ],
                footer: {
                    text: `Requested By ${interaction.user.username} | Made by ${madeby} | Powered By Bypassi`
                },
                timestamp: new Date()
            }],
        });
    }
}

client.login(token);
