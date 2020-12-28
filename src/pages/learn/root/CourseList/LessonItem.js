import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(5),
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  })
);

export default function CourseItem() {
  const classes = useStyles();
  const history = useHistory();

  const [checked, setChecked] = React.useState([0]);
  const handleClick = () => {
    setChecked(!checked);
  };

  return (
    <ListItem
      button
      className={classes.nested}
      onClick={() => history.push('/learn/courses/courseId/lessons/lessonId')}
    >
      <ListItemIcon>
        <Radio checked={checked} onChange={handleClick} />
      </ListItemIcon>
      <ListItemText primary="HTML" />
    </ListItem>
  );
}
