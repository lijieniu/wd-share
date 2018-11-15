module.exports = agent => {
    agent.messenger.on('egg-ready', () => {
        const data = { 
            ready: true,
        };
        agent.messenger.sendToApp('xxx_action', data);
    });
};