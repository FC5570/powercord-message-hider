/* eslint-disable */
const { Plugin } = require('powercord/entities');
const { inject, uninject } = require('powercord/injector');
const { React, getModule } = require('powercord/webpack');

class MessageHider extends Plugin {
	async startPlugin() {
		const { MenuItem } = await getModule(['MenuItem']);
		const menu = await getModule(
			(m) => m?.default?.displayName === 'MessageContextMenu'
		);
		inject('powercord-message-hider', menu, 'default', (args, res) => {
			res.props.children.splice(
				4,
				0,
				React.createElement(MenuItem, {
					name: 'Hide Message',
					separate: true,
					id: 'HideMessageContextMenu',
					label: 'Hide Message',
					color: 'colorDanger',
					action: () => {
						const message = args[0].message;
						document.getElementById(
							`chat-messages-${message.id}`
						).style.display = 'none';

						powercord.api.notices.sendToast('message-hidden', {
							header: 'Success!',
							type: 'success',
							timeout: 10000,
							content:
								'The message has been hidden. To bring it back, switch to another channel then switch to this one.',
							buttons: [
								{
									text: 'Dismiss',
									look: 'filled',
									size: 'small',
									onClick: () =>
										powercord.api.notices.closeToast(
											'message-hidden'
										),
								},
							],
						});
					},
				})
			);
			return res;
		});
	}

	pluginWillUnload() {
		uninject('powercord-message-hider');
	}
}

module.exports = MessageHider;
