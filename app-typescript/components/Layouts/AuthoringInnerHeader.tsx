import * as React from 'react';
import classNames from 'classnames';
import {Icon} from '../Icon';

interface IProps {
    children?: React.ReactNode;
    collapsed?: boolean;
    headerPadding?: React.CSSProperties['padding'];
}
interface IState {
    collapsed: boolean;
}

export class AuthoringInnerHeader extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            collapsed: this.props.collapsed ? this.props.collapsed : false,
        };
    }

    render() {
        const classes = classNames('sd-editor-content__authoring-header', {
            'authoring-header--collapsed': this.state.collapsed,
        });
        const {headerPadding} = this.props;

        return (
            <header
                style={{padding: headerPadding}}
                className={classes}
            >
                <div className="authoring-header__holder">
                    {this.props.children}
                </div>
                <button className="authoring-header__toggle"
                    onClick={() => this.setState({collapsed: !this.state.collapsed})}>
                    <Icon name="chevron-up-thin" />
                </button>
            </header>
        );
    }
}
