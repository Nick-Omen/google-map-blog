import React from 'react';
import PlaceItem from './Item';
import classes from './List.css';

export default props => (
  <ul className={classes.list}>
    {props.places.map(p => <PlaceItem key={p.id}
                                      className={classes.listItem}
                                      centerMap={props.centerMap}
                                      {...p} />)}
  </ul>
);
