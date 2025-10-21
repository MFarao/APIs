const CategoryRow = ({ category, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{category.id}</td>
      <td>{category.description}</td>
      <td>
        <button className="button edit" onClick={onEdit}>Edit</button>
        <button className="button delete" onClick={onDelete}>Delete</button>
      </td>
    </tr>
  );
};

export default CategoryRow;
