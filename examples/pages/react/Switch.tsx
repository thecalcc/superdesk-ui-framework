import * as React from 'react';
import * as Markup from '../../js/react';
import * as Components from '../playgrounds/react-playgrounds/components/Index';

import { Switch, SwitchGroup, Prop, PropsList } from '../../../app-typescript';

interface IState {
    value1: boolean;
    value2: boolean;
    value3: boolean;
    value4: boolean;
    value5: boolean;
    value6: boolean;
    value7: boolean;
    value8: boolean;
    value9: boolean;
    value10: boolean;
    value11: boolean;
}

export default class SwitchDoc extends React.Component<{}, IState> {
    constructor(props) {
        super(props);

        this.state = {
            value1: false,
            value2: true,
            value3: false,
            value4: true,
            value5: false,
            value6: true,
            value7: true,
            value8: false,
            value9: false,
            value10: true,
            value11: false,
        };
    }

    render() {
        return (
            <section className="docs-page__container">
                <h2 className="docs-page__h2">Switch</h2>
                <p></p>
                <Markup.ReactMarkupCodePreview>{`
                    <Switch label={{text:'Switch label'}} value={value1} onChange={(value) => this.setState(() => ({ value1: value }))} />
                `}
                </Markup.ReactMarkupCodePreview>
                <Markup.ReactMarkup>
                    <Markup.ReactMarkupPreview>
                    <p className="docs-page__paragraph docs-page__paragraph--topMarginL">// Label on the right (default)</p>
                        <div className="form__row">
                            <Switch label={{text:'Switch label right'}} value={this.state.value1} onChange={(value) => this.setState(() => ({ value1: value }))} />
                        </div>
                        <p className="docs-page__paragraph docs-page__paragraph--topMarginL">// Labels on the left</p>
                        <p className="docs-page__paragraph--small">This option should be used only in cases when the switch is aligned to the right.</p>
                        <div className="form__row">
                            <Switch label={{text:'Label on left', side: 'left'}} value={this.state.value2} onChange={(value) => this.setState(() => ({ value2: value }))} />
                        </div>
                        <p className="docs-page__paragraph docs-page__paragraph--topMarginL">// Disabled</p>
                        <div className="form__row">
                            <Switch label={{text:'Label on right with disabled state'}} value={this.state.value3} onChange={(value) => this.setState(() => ({ value3: value }))} disabled={true} />
                        </div>
                    </Markup.ReactMarkupPreview>
                    <Markup.ReactMarkupCode>{`
                        // Label on the right (default)
                            <Switch label={{text:'Switch label right'}} value={this.state.value1} onChange={(value) => this.setState(() => ({ value1: value }))} />
                            
                        // Labels on the left
                            <Switch label={{text:'Label on left', side: 'left'}} value={this.state.value2} onChange={(value) => this.setState(() => ({ value2: value }))} />

                        // Disabled
                            <Switch label={{text:'Label on right with disabled state'}} value={this.state.value3} onChange={(value) => this.setState(() => ({ value3: value }))} disabled={true} />
                    `}
                    </Markup.ReactMarkupCode>
                </Markup.ReactMarkup>

                <h3 className="docs-page__h3">Switch groups</h3>
                <p className="docs-page__paragraph"><code>SwitchGroup</code> is a helpful wrapper component used to group <code>Switch</code> components. 
                By default the switches are grouped horizontaly. To group them verticaly – in a list-like view – add the prop <code>orientation='vertical'</code> 
                to the <code>SwitchGroup</code> component.</p>

                <Markup.ReactMarkup>
                    <Markup.ReactMarkupPreview>
                        <p className="docs-page__paragraph">// Vertical group (default)</p>
                        <div className='form__row'>
                            <SwitchGroup>
                                <Switch label={{text:'Vertical Switch 1'}} value={this.state.value6} onChange={(value) => this.setState(() => ({ value6: value }))} />
                                <Switch label={{text:'Vertical Switch 2'}} value={this.state.value7} onChange={(value) => this.setState(() => ({ value7: value }))} />
                                <Switch label={{text:'Vertical Switch 3'}} value={this.state.value8} onChange={(value) => this.setState(() => ({ value8: value }))} />
                            </SwitchGroup>
                        </div>
                        <p className="docs-page__paragraph docs-page__paragraph--topMarginL">// Vertical group with labels on the left</p>
                        <p className="docs-page__paragraph--small">This option should be used only in special cases and inside containers not wider than 400 pixels <br />
                        (e.g. menus, narrow modals or dialouges etc.). It should be used only in the combination with the labels on th eleft.</p>
                        <div className='form__row docs-page__test-helper-2' style={{width: '320px'}}>
                            <SwitchGroup align='right'>
                                <Switch label={{text:'Vertical Switch 1', side: 'left'}} value={this.state.value9} onChange={(value) => this.setState(() => ({ value9: value }))} />
                                <Switch label={{text:'Vertical Switch 2', side: 'left'}} value={this.state.value10} onChange={(value) => this.setState(() => ({ value10: value }))} />
                                <Switch label={{text:'Vertical Switch 3', side: 'left'}} value={this.state.value11} onChange={(value) => this.setState(() => ({ value11: value }))} />
                            </SwitchGroup>
                        </div>
                        <p className="docs-page__paragraph docs-page__paragraph--topMarginL">// Horizontal group</p>
                        <p className="docs-page__paragraph--small">Use this option only if there are no more than two switches.</p>
                        <div className='form__row'>
                            <SwitchGroup orientation='horizontal'>
                                <Switch label={{text:'Horizontal Switch 1'}} value={this.state.value4} onChange={(value) => this.setState(() => ({ value4: value }))} />
                                <Switch label={{text:'Horizontal Switch 2'}} value={this.state.value5} onChange={(value) => this.setState(() => ({ value5: value }))} />
                            </SwitchGroup>
                        </div>
                    </Markup.ReactMarkupPreview>
                    <Markup.ReactMarkupCode>{`
                        // Vertical group (default)
                        <SwitchGroup>
                            <Switch label={{text:'Vertical Switch 1'}} value={this.state.value6} onChange={(value) => this.setState(() => ({ value6: value }))} />
                            <Switch label={{text:'Vertical Switch 2'}} value={this.state.value7} onChange={(value) => this.setState(() => ({ value7: value }))} />
                            <Switch label={{text:'Vertical Switch 3'}} value={this.state.value8} onChange={(value) => this.setState(() => ({ value8: value }))} />
                        </SwitchGroup>

                        // Vertical group with labels on the left
                        <SwitchGroup align='right'>
                            <Switch label={{text:'Vertical Switch 1', side: 'left'}} value={this.state.value9} onChange={(value) => this.setState(() => ({ value9: value }))} />
                            <Switch label={{text:'Vertical Switch 2', side: 'left'}} value={this.state.value10} onChange={(value) => this.setState(() => ({ value10: value }))} />
                            <Switch label={{text:'Vertical Switch 3', side: 'left'}} value={this.state.value11} onChange={(value) => this.setState(() => ({ value11: value }))} />
                        </SwitchGroup>

                        // Horizontal group
                        <SwitchGroup orientation='horizontal'>
                            <Switch label={{text:'Horizontal Switch 1'}} value={this.state.value4} onChange={(value) => this.setState(() => ({ value4: value }))} />
                            <Switch label={{text:'Horizontal Switch 2'}} value={this.state.value5} onChange={(value) => this.setState(() => ({ value5: value }))} />
                        </SwitchGroup>
                    `}
                    </Markup.ReactMarkupCode>
                </Markup.ReactMarkup>

                <Components.GraphicButtonsGroup>
                    <Components.GraphicButton graphic='design' text='Switch usage guidelines' smallText='Design guidelines' link='#/design/switch' />
                </Components.GraphicButtonsGroup>

                <h3 className="docs-page__h3">Props</h3>
                <p className="docs-page__paragraph">Switch</p>
                <PropsList>
                    <Prop name='label text' isRequered={true} type='string' default='/' description='Label text value.'/>
                    <Prop name='label side' isRequered={false} type='left | right' default='right' description='Position of label relative to the button.'/>
                    <Prop name='disabled' isRequered={false} type='boolean' default='false' description='The disabled state of t.'/>
                </PropsList>
                <p className="docs-page__paragraph">SwitchGroup</p>
                <PropsList>
                    <Prop name='orientation' isRequered={false} type='vertical | horizontal' default='vertical' description='Orientation of Switch components inside the group.'/>
                    <Prop name='align' isRequered={false} type='left | right' default='left' description='Alignment of Switch components inside the group.'/>
                </PropsList>
            </section>
        )
    }
}
