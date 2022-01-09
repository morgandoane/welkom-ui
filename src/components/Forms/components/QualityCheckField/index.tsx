import { TextField } from '@mui/material';
import React, { ReactElement } from 'react';
import { PromptType } from '../../../../graphql/schema/Prompt/Prompt';
import { QualityCheck } from '../../../../graphql/schema/QualityCheck/QualityCheck';
import BooleanField from '../BooleanField';
import NumberField from '../NumberField';
import TextFormField from '../TextFormField';

export interface QualityCheckFieldProps {
    check: QualityCheck;
    value: string;
    onChange: (value: string) => void;
}

const QualityCheckField = (props: QualityCheckFieldProps): ReactElement => {
    const { check, value, onChange } = props;

    switch (check.prompt.type) {
        case PromptType.Boolean: {
            return (
                <BooleanField
                    label={check.prompt.phrase}
                    value={value == 'true' ? true : false}
                    onChange={(val) => {
                        onChange(val == true ? 'true' : 'false');
                    }}
                />
            );
        }
        case PromptType.Number: {
            const val = value == '' ? null : parseFloat(value);
            const parsed = val == null ? null : isNaN(val) ? null : val;
            return (
                <NumberField
                    label={check.prompt.phrase}
                    value={parsed}
                    onChange={(val) => {
                        onChange(val == null ? '' : val + '');
                    }}
                />
            );
        }
        case PromptType.Text: {
            return (
                <TextFormField
                    label={check.prompt.phrase}
                    value={value}
                    onChange={(val) => {
                        onChange(val || '');
                    }}
                />
            );
        }
    }
};

export default QualityCheckField;
