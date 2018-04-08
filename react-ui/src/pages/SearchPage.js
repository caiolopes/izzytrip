import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { Link } from "react-router-dom";

const styles = theme => ({
  button: {
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    overflow: 'hidden',  
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },  
  layer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
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
  coisas: {
    width: '33%',
    marginTop: 30,
  },
  fotos: {
    height: 210,
    width: 350,
  },

});

const defaultImage = "https://brightcove04pmdo-a.akamaihd.net/5104226627001/5104226627001_5297440765001_5280261645001-vs.jpg?pubId=5104226627001&videoId=5280261645001";


class SearchPage extends Component {
  state = {
    searchValue: '',
  }

  onChange = (e) => {
    this.setState({ searchValue: e.target.value });
  }

  render() {
    const { searchValue } = this.state;
    const { classes, image, headline, buttonText, pathname } = this.props;

    return (
      <div>
        <Parallax bgImage={image} blur={{min: -1,max:3}}>
          <div className={classes.layer}></div>
          <div className={classes.search}>
            <Typography variant="display1">{headline}</Typography>
            <br />
            <div className={classes.container}>
              <form onSubmit={(e) => e.preventDefault()}>
                <TextField
                  placeholder="Digite uma cidade aqui"
                  id="bootstrap-input"
                  value={searchValue}
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
                  onChange={this.onChange}
                />
                <Link to={{ pathname: `${pathname}/${searchValue}` }} className={classes.button}><Button type="submit" variant="raised" color="primary" >{buttonText}</Button></Link>
              </form>
            </div>
          </div>
        </Parallax>
        <div align="center" className={classes.container}>
          <div className={classes.coisas}>
            <img className={classes.fotos} src="https://abrilexame.files.wordpress.com/2018/03/rio-de-janeiro.jpg"></img>
            <p>Brotas</p>
          </div>
          <div className={classes.coisas}>
            <img className={classes.fotos} src="https://img.stpu.com.br/?img=https://s3.amazonaws.com/pu-mgr/default/a0RG000000jZEZ8MAO/599edd29e4b09522ea202d70.jpg&w=620&h=400"></img>
          </div>
          <div className={classes.coisas}>
            <img className={classes.fotos} src="https://spguia.melhoresdestinos.com.br/system/fotos_local/fotos/34201/show/igreja-de-sao-francisco-de-assis.jpg"></img>
          </div>
        </div>
      </div>
    );
  }
}

SearchPage.defaultProps = {
  image: defaultImage,
  pathname: "/list/it",
  headline: 'Aonde você quer ir?',
  buttonText: 'Busque itinerários',
}

export default withStyles(styles)(SearchPage);
