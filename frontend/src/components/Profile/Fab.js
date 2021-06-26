const Fab = props => {
  return (
    <div className={props.hidden ? 'fab is-hidden' : 'fab'} onClick={props.onClick}>
      <span className="fab-symbol">Add a Character</span>
    </div>
  );
};

export default Fab;
