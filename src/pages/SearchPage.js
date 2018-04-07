import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  search: {
    height: 500,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textFieldRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  textFieldInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  textFieldFormLabel: {
    fontSize: 18,
  },
});

const image = "https://brightcove04pmdo-a.akamaihd.net/5104226627001/5104226627001_5297440765001_5280261645001-vs.jpg?pubId=5104226627001&videoId=5280261645001";

class SearchPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Parallax bgImage={image} blur={{min: -1,max:3}}>
          <div className={classes.search}>
            <Typography variant="display1">Aonde você quer ir?</Typography>
            <br />
            <div className={classes.container}>
              <TextField
                placeholder="Digite uma cidade aqui"
                id="bootstrap-input"
                InputProps={{
                  disableUnderline: true,
                  classes: {
                    root: classes.textFieldRoot,
                    input: classes.textFieldInput,
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                  className: classes.textFieldFormLabel,
                }}
                style={{marginRight: 10, width: '60vw'}}
              />
              <Button variant="raised" color="primary">Busque intinerários</Button>
            </div>
          </div>
        </Parallax>
      </div>
    );
  }
}

export default withStyles(styles)(SearchPage);
