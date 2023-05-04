module.exports = {
    command: 'plugin',
    arguments: ['<choices:install,uninstall,compile>', '[<plugin-name>]'],
    description: `Plugin Commands.
    njs2 plugin @juego/njs2-auth-email
    njs2 plugin install @juego/njs2-auth-email
    njs2 plugin compile
    njs2 plugin uninstall @juego/njs2-auth-email
    `,
    summary: 'Plugin Commands',
    usage: '<choices:install,uninstall,compile> [<plugin-name>]'
}