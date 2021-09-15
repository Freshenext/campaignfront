import {Box, Button, Paper, TextField} from "@material-ui/core";

export default function BookDemoFormComponent(){
    return <Box
        position="absolute"
        width="100%"
        textAlign="center"
        marginTop={10}
    >
        <Paper style={{ backgroundColor: "#563A88", color : 'white', padding: '1em'}}>
            <Box>
                <span>Book a demo  with SofiaPulse and see your brand establish real connections.</span>
            </Box>
            <Box marginTop={1}>
                <TextField
                    label="Your Name"
                    variant="outlined"
                    InputLabelProps={{ style : { color: '#E0DEE4'}}}
                    InputProps={{ style : { borderRadius: '10px', color : 'white'}}}
                />
            </Box>
            <Box marginTop={1}>
                <TextField
                    label="Your Email"
                    variant="outlined"
                    InputLabelProps={{ style : { color: '#E0DEE4'}}}
                    InputProps={{ style : { borderRadius: '10px', borderColor: '#8667BD', color : 'white'}}}
                />
            </Box>
            <Button
                variant="contained"
                style={{ marginTop: '1em', textTransform: "unset",
                borderRadius: '10px', fontSize: '1rem', padding: '0.5em'}}
                className="primaryBackgroundColor"
                fullWidth
            >Book a demo</Button>
        </Paper>
    </Box>
}