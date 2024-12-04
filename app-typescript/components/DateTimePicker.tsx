import * as React from 'react';
import {DatePicker} from '../components/DatePicker';
import {Spacer} from '@superdesk/common';
import {defaultTo} from 'lodash';
import {TimePicker} from './TimePicker';
import {IconButton} from './IconButton';

interface IProps {
    value: Date | null;
    label?: string;
    dateFormat: string;
    onChange: (value: string | null) => void;
    preview?: boolean;
    fullWidth?: boolean;
    allowSeconds?: boolean;
    required?: boolean;
    width?: React.CSSProperties['width'];
    disabled?: boolean;
}

const MIN_WIDTH = 348;

export class DateTimePicker extends React.PureComponent<IProps> {
    handleTimeChange = (time: string) => {
        const [hours, minutes] = time.split(':').map((x) => defaultTo(parseInt(x, 10), 0)); // handle NaN value
        const origDate = this.props.value ?? new Date();

        origDate.setHours(hours);
        origDate.setMinutes(minutes);

        this.props.onChange(origDate.toISOString());
    }

    handleDateChange = (date?: string) => {
        if (date == null) {
            this.props.onChange(null);

            return;
        }

        const selectedDate = new Date(date);
        const origDate = this.props.value ?? new Date();

        selectedDate.setHours(origDate.getHours());
        selectedDate.setMinutes(origDate.getMinutes());

        this.props.onChange(selectedDate.toISOString());
    }

    prepareFormat(unitOfTime: number) {
        return unitOfTime.toString().padStart(2, '0');
    }

    render() {
        const convertedValue = this.props.value ? new Date(this.props.value) : null;
        const convertedTimeValue = convertedValue
            ? `${this.prepareFormat(convertedValue.getHours())}:${this.prepareFormat(convertedValue.getMinutes())}`
            : '';

        return (
            <div style={{width: Number(this.props.width) > MIN_WIDTH ? this.props.width : MIN_WIDTH}}>
                <Spacer h gap="0" noGrow alignItems='end'>
                    <DatePicker
                        disabled={this.props.disabled}
                        preview={this.props.preview}
                        required={this.props.required}
                        hideClearButton={true}
                        value={convertedValue}
                        onChange={(val) => {
                            this.handleDateChange(val?.toString());
                        }}
                        dateFormat={this.props.dateFormat}
                        label={this.props.label ?? undefined}
                        inlineLabel={this.props.label == null}
                        labelHidden={this.props.label == null}
                        fullWidth={this.props.fullWidth}
                    />
                    <TimePicker
                        disabled={this.props.disabled}
                        preview={this.props.preview}
                        value={convertedTimeValue}
                        onChange={(val) => {
                            this.handleTimeChange(val);
                        }}
                        allowSeconds={this.props.allowSeconds}
                        fullWidth={this.props.fullWidth}
                        required={this.props.required}
                    />
                    {this.props.preview !== true && (
                        <IconButton
                            disabled={this.props.disabled}
                            icon='close-small'
                            onClick={() => {
                                this.props.onChange(null);
                            }}
                            ariaValue='Clear'
                        />
                    )}
                </Spacer>
            </div>
        );
    }
}
