import * as React from 'react';

import * as Markup from '../../js/react';

import {Button, Menu} from '../../../app-typescript';
import {IMenuItem} from '../../../app-typescript/components/Menu';

const menuItems: Array<IMenuItem> = [
    {
        label: 'Edit',
        icon: 'icon-pencil',
        onClick: () => console.log('action: Edit'),
    },
    {
        label: 'Edit in the new window',
        icon: 'icon-pencil',
        onClick: () => console.log('action: Edit in the new window'),
    },
    {
        label: 'Translate',
        icon: 'icon-globe',
        children: [
            {
                label: 'German',
                onClick: () => console.log('action: German'),
            },
            {
                label: 'French',
                onClick: () => console.log('action: French'),
            },
        ],
    },
    {
        label: 'Export',
        icon: 'icon-download',
        onClick: () => console.log('action: Export'),
    },
    {
        label: 'Spike item',
        icon: 'icon-trash',
        onClick: () => console.log('action: Spike item'),
    },
    {separator: true},
    {
        label: 'Send to',
        icon: 'icon-share-alt',
        onClick: () => console.log('action: Send to'),
    },
    {
        label: 'Export',
        icon: 'icon-download',
        onClick: () => console.log('action: Export'),
    },
    {
        label: 'Spike item',
        icon: 'icon-trash',
        onClick: () => console.log('action: Spike item'),
    },
];

export class MenuDocs extends React.Component {
    render() {
        return (
            <section className='docs-page__container'>

                <h2 className='docs-page__h2'>Menu</h2>

                <p className='docs-page__paragraph'></p>
                <Markup.ReactMarkup>
                    <Markup.ReactMarkupPreview>
                        <div className='docs-page__content-row docs-page__content-row--no-margin'>
                            <div className='form__row'>
                                <Menu items={menuItems}>
                                    {(toggle) => (
                                        <Button
                                            text="open menu"
                                            onClick={(event) => {
                                                toggle(event);
                                            }}
                                        />
                                    )}
                                </Menu>
                            </div>
                        </div>

                    </Markup.ReactMarkupPreview>

                    <Markup.ReactMarkupCode>{`
                        const menuItems = [
                            {
                                label: 'Action 1',
                                icon: 'icon-globe',
                                children: [
                                    {
                                        label: 'Action item 2',
                                        icon: 'icon-globe',
                                        onClick: () => console.log('action: Action item 2'),
                                    },
                                ],
                            },
                        ];

                        <Menu items={menuItems}>
                            {(toggle) => (
                                <Button
                                    text="open menu"
                                    onClick={(event) => {
                                        toggle(event);
                                    }}
                                />
                            )}
                        </Menu>
                    `}</Markup.ReactMarkupCode>
                </Markup.ReactMarkup>
            </section>
        )
    }
}
