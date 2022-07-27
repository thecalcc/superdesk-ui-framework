import * as React from "react";
import { Icon } from "./Icon";
import { Loader } from "./Loader";
import classNames from 'classnames';
import nextId from "react-id-generator";

interface IState<T> {
    value?: any;
    options?: Array<ITreeNode<T>> | any;
    firstBranchOptions?: Array<any>;                // to return on first branch in dropdown
    openDropdown?: boolean;                         // open/close dropdown
    activeTree?: Array<any> | any;                  // for filtered array
    filterArr?: Array<any> | any;                   // for filtered array
    searchFieldValue?: string;                      // filter value of input
    buttonTree?: Array<any> | any;                  // array of button (for backButton)
    buttonValue?: any;                              // button for name of category
    buttonMouseEvent?: boolean;                     // valueButton hover
    selectBranchWithChildren?: boolean;
    loading: boolean;
    invalid: boolean;
}

interface IPropsBase<T> {
    value?: Array<T>;
    selectBranchWithChildren?: boolean;
    readOnly?: boolean;
    width?: string;
    allowMultiple?: boolean;
    loading?: boolean;
    invalid?: boolean;
    inlineLabel?: boolean;
    labelHidden?: boolean;
    tabindex?: number;
    fullWidth?: boolean;
    info?: string;
    error?: string;
    required?: boolean;
    label?: string;
    disabled?: boolean;
    getLabel(item: T): string;
    getId(item: T): string;
    optionTemplate?(item: T): React.ComponentType<T> | JSX.Element;
    valueTemplate?(item: T): React.ComponentType<T> | JSX.Element;
    onChange(e: Array<T>): void;
}

interface IPropsSync<T> extends IPropsBase<T> {
    kind: 'synchronous';
    getOptions(): Array<ITreeNode<T>>;
}

interface IPropsAsync<T> extends IPropsBase<T> {
    kind: 'asynchronous';
    getOptions?(): Array<ITreeNode<T>>;
    searchOptions(term: string, callback?: (options: Array<ITreeNode<T>>) => void): any;
}

type IProps<T> = IPropsSync<T> | IPropsAsync<T>;

export interface ITreeNode<T> {
    value: T;
    children?: Array<ITreeNode<T>>;
}

export class TreeSelect<T> extends React.Component<IProps<T>, IState<T>> {
    private dropdownRef: React.RefObject<HTMLInputElement>;
    private openDropdownRef: React.RefObject<HTMLInputElement>;

    constructor(props: IProps<T>) {
        super(props);
        this.state = {
            value: this.props.value ? this.props.value : [],
            options: this.props.getOptions ? this.props.getOptions() : [],
            firstBranchOptions: this.props.getOptions ? this.props.getOptions() : [],
            activeTree: [],
            filterArr: [],
            searchFieldValue: '',
            buttonTree: [],
            buttonValue: [],
            buttonMouseEvent: false,
            openDropdown: false,
            loading: this.props.loading ? this.props.loading : false,
            invalid: this.props.invalid ? this.props.invalid : false,
        };

        this.removeClick = this.removeClick.bind(this);
        this.handleMultiLevel = this.handleMultiLevel.bind(this);
        this.backButton = this.backButton.bind(this);
        this.handleButton = this.handleButton.bind(this);
        this.backButtonValue = this.backButtonValue.bind(this);
        this.filteredItem = this.filteredItem.bind(this);
        this.dropdownRef = React.createRef();
        this.openDropdownRef = React.createRef();
    }

    removeClick(i: number) {
        let newTags = this.state.value;
        newTags.splice(i, 1);

        this.setState({
            value: newTags,
        });
        this.props.onChange(this.state.value);
    }

    handleMultiLevel(item: { children?: Array<T>; }) {
        if (item.children) {
            this.setState({
                activeTree: [...this.state.activeTree, this.state.options],
                options: item.children,
            });
        }
    }

    handleButton(item: { children?: Array<T>; }) {
        this.setState({
            buttonTree: [...this.state.buttonTree, this.state.buttonValue],
            buttonValue: item,
        });
    }

    handleValue(event: React.MouseEvent<HTMLLIElement, MouseEvent>, item: { value: T; }) {
        if (this.props.allowMultiple) {
            let checkItem = this.state.value.find((valueItem: T) => {

                return this.props.getId(valueItem) === this.props.getId(item.value);
            });
            if (!checkItem) {
                this.setState({value: [...this.state.value, item.value]});
            }
            if (!event.ctrlKey) {
                if (this.props.getOptions) {
                    this.setState({options: this.state.firstBranchOptions, activeTree: [], openDropdown: false});
                } else {
                    this.setState({activeTree: [], openDropdown: false});
                }
            }
            this.setState({buttonMouseEvent: false});
        } else {
            let checkItem = this.state.value.find((valueItem: T) => {
                return this.props.getId(valueItem) === this.props.getId(item.value);
            });
            if (!checkItem) {
                this.setState({value: [item.value]});
            }
            if (!event.ctrlKey) {
                this.setState({options: this.state.firstBranchOptions, activeTree: [], openDropdown: false});
            }
            this.setState({buttonMouseEvent: false});
        }
    }

    handleBranchValue(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: { value: T; }) {
        if (this.props.allowMultiple) {
            if (this.props.selectBranchWithChildren) {
                let checkItem = this.state.value.find((valueItem: T) => {
                    return this.props.getId(valueItem) === this.props.getId(item.value);
                });
                if (!checkItem) {
                    this.setState({value: [...this.state.value, item.value]});
                }
                if (!event.ctrlKey) {
                    this.setState({options: this.state.firstBranchOptions, activeTree: [], openDropdown: false});
                }
                this.setState({buttonMouseEvent: false});
            }
        } else {
            if (this.props.selectBranchWithChildren) {
                let checkItem = this.state.value.find((valueItem: T) => {
                    return this.props.getId(valueItem) === this.props.getId(item.value);
                });
                if (!checkItem) {
                    this.setState({value: [item.value]});
                }
                if (!event.ctrlKey) {
                    this.setState({options: this.state.firstBranchOptions, activeTree: [], openDropdown: false});
                }
                this.setState({buttonMouseEvent: false});
            }
        }
    }

    backButton = () => {
        if (this.state.activeTree.length > 0) {
            this.setState({
                options: this.state.activeTree.pop(),
            });
            return;
        } else {
            return false;
        }
    }

    backButtonValue = () => {
        this.setState({
            buttonValue: this.state.buttonTree.pop(),
        });
    }

    recursion(arr: Array<ITreeNode<T>>) {
        if (this.props.selectBranchWithChildren) {
            arr.map((item) => {
                this.state.filterArr.push(item);
                if (item.children) {
                    this.recursion(item.children);
                }
            });
        } else {
            arr.map((item) => {
                if (!item.children) {
                    this.state.filterArr.push(item);
                } else {
                    this.recursion(item.children);
                }
            });
        }
    }

    componentDidMount = () => {
        this.recursion(this.state.options);
        document.addEventListener("mousedown", (event) => {
            if ((this.dropdownRef.current && !this.dropdownRef.current.contains(event.target))
            && (this.openDropdownRef.current && !this.openDropdownRef.current.contains(event.target))) {
                this.setState({openDropdown: false});
            }
        });
    }

    componentDidUpdate(prevProps: Readonly<IProps<T>>, prevState: Readonly<IState<T>>): void {
        if (prevState.value !== this.state.value) {
            this.props.onChange(this.state.value);
        } else if (prevProps.value !== this.props.value) {
            this.props.onChange(this.state.value);
        }
    }

    filteredItem() {
        if (this.props.kind === 'synchronous') {
            return this.state.filterArr.filter((item: any) => {
                if (this.state.searchFieldValue) {
                    if (this.props.getLabel(item.value)
                    .toLowerCase().includes(this.state.searchFieldValue.toLowerCase())) {
                        return item;
                    }
                } else {
                    return item;
                }
            }).map((item: T, i: React.Key | undefined) => {
                let test = this.state.value.some((obj: any) =>
                    this.props.getId(obj) === this.props.getId(item),
                );
                return <li key={i}
                className={`suggestion-item suggestion-item--multi-select`}
                onClick={(event) => {
                    this.handleValue(event, item);
                }}>
                    <span
                    className={ test
                    ? 'suggestion-item--disabled' : undefined}>
                        {this.props.getLabel(item.value)}
                    </span>
                </li>;
            });
        } else if (this.props.kind === 'asynchronous') {
            return this.state.options.map((item: T, i: React.Key | undefined) => {
                let test = this.state.value.some((obj: any) =>
                    this.props.getId(obj) === this.props.getId(item),
                );
                return (
                    <li key={i}
                    className={`suggestion-item suggestion-item--multi-select`}
                    onClick={(event) => {
                    this.handleValue(event, item);
                    }}>
                        <span
                        className={ test
                        ? 'suggestion-item--disabled' : undefined}
                        >
                            {this.props.getLabel(item.value)}
                        </span>
                    </li>
                );
            });
        }
    }

    render() {

        const labelClasses = classNames('sd-input__label', {
            'a11y-only': this.props.labelHidden,
        });

        const classesLabel = classNames('sd-input', {
            'sd-input--inline-label': this.props.inlineLabel,
            'sd-input--required': this.props.required,
            'sd-input--disabled': this.props.disabled,
            'sd-input--full-width': this.props.fullWidth,
            'sd-input--invalid': this.props.invalid || this.state.invalid,
        });

        const htmlId = nextId();

        return (
            <div className={classesLabel}>
                <label className={labelClasses} htmlFor={htmlId} id={htmlId + 'label'}
                        tabIndex={this.props.tabindex === undefined ? undefined : -1}>
                    {this.props.label}
                </label>

                <div className="tags-input tags-input--multiselect sd-input__input">
                    <div className="tags-input__tags">
                        {this.props.readOnly
                        || <button ref={this.openDropdownRef}
                        className="tags-input__add-button"
                        onClick={() => this.setState({openDropdown: !this.state.openDropdown})}>
                            <i className="icon-plus-large"></i>
                        </button>}
                            <ul className="tags-input__tag-list">
                                {this.state.value.map((item: any, i: number) => {
                                    return <React.Fragment key={i}>
                                        <li
                                        className={"tags-input__tag-item tags-input__tag-item-multiselect"
                                        + (this.props.readOnly ? ' tags-input__tag-item-readonly' : '')}
                                        onClick={() => this.props.readOnly || this.removeClick(i)}>
                                            <span className="tags-input__helper-box">
                                                {this.props.valueTemplate
                                                ? this.props.valueTemplate(item)
                                                : <span>{this.props.getLabel(item)}</span>}
                                                {this.props.readOnly
                                                || <span className="tags-input__remove-button">
                                                    <i className="icon-close-small"></i>
                                                </span>}
                                            </span>
                                        </li>
                                    </React.Fragment>;
                                })}
                            </ul>
                    </div>

                    {this.state.openDropdown &&
                    <div className={"autocomplete autocomplete-multiselect" + (this.props.width === 'medium' ? ' autocomplete-multiselect-width' : '')} ref={this.dropdownRef}>
                        <div className='autocomplete__header'>
                            <div className="autocomplete__icon" onClick={() => {
                            this.backButtonValue();
                            this.backButton();
                            }}>
                                {this.state.activeTree.length > 0
                                ? <Icon name="arrow-left" className="arrow-left"></Icon>
                                : <Icon name="search" className="search"></Icon>}
                            </div>
                            <div className='autocomplete__filter'>
                                {this.state.activeTree.length > 0
                                    ? <button
                                    className={'autocomplete__button' + (this.props.selectBranchWithChildren ? ' autocomplete__button--multiselect' : '')}
                                    onMouseOver={() => this.setState({buttonMouseEvent: true})}
                                    onMouseOut={() => this.setState({buttonMouseEvent: false})}
                                    value={this.state.buttonValue}
                                    onClick={(event) => this.handleBranchValue(event, this.state.buttonValue)}>
                                        {this.state.buttonMouseEvent && this.props.selectBranchWithChildren ? 'Choose entire category' : (this.props.optionTemplate ? this.props.optionTemplate(this.state.buttonValue.value) : this.props.getLabel(this.state.buttonValue.value))}
                                    </button>
                                    : <input
                                    type="text"
                                    className="autocomplete__input"
                                    ref={(input: any) => input && input.focus()}
                                    value={this.state.searchFieldValue}
                                    onChange={(event) => {
                                        if (this.props.kind === 'asynchronous') {
                                            this.props.searchOptions(event.target.value, (items) => {
                                                this.setState({options: items, searchFieldValue: event.target.value});
                                            });
                                        } else if (this.props.kind === 'synchronous') {
                                            this.setState({searchFieldValue: event.target.value});
                                        }
                                    }}
                                    />
                                }
                            </div>
                        </div>
                        {this.state.loading
                        ? <ul className="suggestion-list--loader"><Loader overlay={true}></Loader></ul>
                        :
                        this.state.searchFieldValue === ''
                            ? this.props.getOptions ?
                            <ul className="suggestion-list suggestion-list--multi-select">
                            {this.state.options
                            .map((option: any, i: React.Key | undefined) => {
                                let test = this.state.value.some((obj: any) =>
                                    this.props.getId(obj) === this.props.getLabel(option.value),
                                );
                                return (
                                    <li key={i}
                                    className={`suggestion-item suggestion-item--multi-select`}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        if (option.children) {
                                            this.handleButton(option);
                                            this.handleMultiLevel(option);
                                            if (event.altKey && this.props.allowMultiple) {
                                                if (this.props.selectBranchWithChildren) {
                                                    let filteredItems = option.children
                                                    .filter((item: { value: any; }) => {
                                                        if (!this.state.value.includes(item.value)) {
                                                            return item;
                                                        }
                                                        return;
                                                    });
                                                    this.setState({
                                                        value: [...this.state.value, ...filteredItems],
                                                        options: this.state.firstBranchOptions,
                                                        openDropdown: false,
                                                        activeTree: [],
                                                    });
                                                } else {
                                                    let filteredItems = option.children
                                                    .filter((item: { value: any; children: any; }) => {
                                                        if (!this.state.value.includes(item.value)
                                                        && !item.children) {
                                                            return item;
                                                        }
                                                        return;
                                                    });
                                                    if (filteredItems.length > 0) {
                                                        this.setState({
                                                            value: [...this.state.value, ...filteredItems],
                                                            options: this.state.firstBranchOptions,
                                                            openDropdown: false,
                                                            activeTree: [],
                                                        });
                                                    }
                                                }
                                            }
                                        } else {
                                            this.handleValue(event, option);
                                            if (!event.ctrlKey) {
                                                this.setState({openDropdown: false});
                                            }
                                        }
                                    }}>
                                        {this.props.optionTemplate
                                        ? this.props.optionTemplate(option.value)
                                        : <span
                                        className={ test
                                        ? 'suggestion-item--disabled' : undefined}
                                        >
                                            {this.props.getLabel(option.value)}
                                        </span>}
                                        {option.children && <span className="suggestion-item__icon">
                                            <Icon name="chevron-right-thin"></Icon>
                                        </span>}
                                    </li>
                                );
                            })}</ul> : null
                            :
                            <ul className="suggestion-list suggestion-list--multi-select">
                            {this.filteredItem()}
                            </ul>
                    }
                    </div>}
                </div>

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
