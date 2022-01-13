const { React, getModule } = require('powercord/webpack');
const { Divider, Tooltip, Button } = require('powercord/components');
const { SwitchItem, TextInput, SelectInput, Category, SliderInput } = require('powercord/components/settings');

const { AsyncComponent } = require("powercord/components")

module.exports = AsyncComponent.from((async () => {
    return class HiddenSettings extends React.PureComponent {
        constructor(props) {
            super(props)

            this.state = {
                popup: this.props.getSetting('popup', true)
            };
        }

        render() {
            return <>
                <div>
                    <SwitchItem
                        note="Display hidden-message popup"
                        value={this.state.popup}
                        onChange={() => {
                            this.setState({ popup: !this.state.popup })
                            this.props.toggleSetting('popup')
                        }}
                    >
                        Popup
                    </SwitchItem>   
                </div>
            </>
        }
    }
})
    ()
)