import * as React from 'react';
import classNames from 'classnames';
import nextId from "react-id-generator";

interface IProps {
    value?: string;
    type?: 'text' | 'number' | 'password';
    label: string;
    maxLength?: number;
    info?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    inlineLabel?: boolean;
    labelHidden?: boolean;
    onChange(newValue: string): void;
}

interface IState {
    value: string;
    invalid: boolean;
}

export class Input extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            value: this.props.value ?? '',
            invalid: this.props.invalid ?? false,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    htmlId = nextId();

    handleData(value: string) {
        this.setState({ value: value ?? '' });
        this.props.onChange(value ?? '');

        if (this.props.maxLength && !this.props.invalid) {
            this.setState({ invalid: value.length > this.props.maxLength });
        }
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.handleData(event.target.value);
    }

    componentDidUpdate(prevProps: IProps) {
        if (this.props.value !== prevProps.value) {
            this.handleData(this.props.value ?? '');
          }
    }

    render() {
        const classes = classNames('sd-input', {
            'sd-input--inline-label': this.props.inlineLabel,
            'sd-input--required': this.props.required,
            'sd-input--disabled': this.props.disabled,
            'sd-input--invalid': this.props.invalid || this.state.invalid,
        });
        const labelClasses = classNames('sd-input__label', {
            'a11y-only': this.props.labelHidden,
        });

        return (
            <div className={classes}>
                <label className={labelClasses} htmlFor={this.htmlId} id={this.htmlId + 'label'}>
                    {this.props.label}
                </label>

                <input className='sd-input__input'
                    type={this.props.type ?? 'text'}
                    id={this.htmlId}
                    value={this.state.value}
                    aria-label={this.props.label}
                    aria-describedby={this.htmlId + 'label'}
                    onChange={this.handleChange}
                    disabled={this.props.disabled} />

                {this.props.maxLength ?
                    <div className='sd-input__char-count'>{this.state.value.length} / {this.props.maxLength}</div>
                    : null}

                <div className='sd-input__message-box'>
                    {this.props.info && !this.props.invalid && !this.state.invalid ?
                        <div className='sd-input__hint'>{this.props.info}</div> : null}
                    {this.props.invalid || this.state.invalid ?
                        <div className='sd-input__message'>{this.props.error}</div>
                        : null}
                </div>
            </div>
        );
    }
}
