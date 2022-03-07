import { Button } from '@mui/material';
import React, { ReactElement } from 'react';
import Message from '../../../../feedback/Message';
import { FormHandler, FormResult } from '../../types';

export interface FormMessageProps<Result> {
    handler: FormHandler<Result>;
    entity?: string;
    type: 'created' | 'deleted' | 'updated' | 'error';
    data: Result | undefined | null;
    reset: () => void;
}

const FormMessage = <Result,>(
    props: FormMessageProps<Result>
): ReactElement => {
    const { handler, entity = 'Data', type, data, reset } = props;

    const onComplete = () => {
        if (data) {
            if (typeof handler == 'function') {
                handler(data);
            } else {
                switch (type) {
                    case 'created': {
                        handler.onCreated(data);
                        break;
                    }
                    case 'deleted': {
                        handler.onDeleted(data);
                        break;
                    }
                    case 'updated': {
                        handler.onUpdated(data);
                        break;
                    }
                }
            }
        }
    };

    switch (type) {
        case 'created': {
            return (
                <Message
                    type="Success"
                    onComplete={onComplete}
                    message={`${entity} created!`}
                />
            );
        }
        case 'updated': {
            return (
                <Message
                    type="Success"
                    onComplete={onComplete}
                    message={`${entity} updated!`}
                />
            );
        }
        case 'deleted': {
            return (
                <Message
                    type="Success"
                    onComplete={onComplete}
                    message={`${entity} deleted`}
                />
            );
        }
        case 'error': {
            return (
                <Message
                    type="Error"
                    message={`Problem sending ${entity.toLowerCase()} to server.`}
                    action={<Button onClick={reset}>Reset</Button>}
                />
            );
        }
    }
};

export default FormMessage;
