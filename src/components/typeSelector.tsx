import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Box, FormControl, InputLabel } from '@mui/material';

interface ITypeSelector {
    type: string
    setType: React.Dispatch<React.SetStateAction<string>>
}

export default function TypeSelector({ type, setType }: ITypeSelector) {

    const changeHandler = (e: SelectChangeEvent) => {
        setType(e.target.value as string)
    }

    return (
        <Box>
            <FormControl fullWidth className='text-white'>
                <InputLabel className='text-white' id="demo-select-small-label">Type</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={type}
                    label="Type"
                    onChange={changeHandler}
                    className='text-white border border-[#6b6b6b]'
                >
                    <MenuItem value={''}>None</MenuItem>
                    <MenuItem value={'movie'}>Movie</MenuItem>
                    <MenuItem value={'series'}>Series</MenuItem>
                    <MenuItem value={'game'}>Game</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}