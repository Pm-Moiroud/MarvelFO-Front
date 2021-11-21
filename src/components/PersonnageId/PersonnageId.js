const PersonnageId = ({ title, picture, description, extension }) => {
  return (
    <>
      <section className="section-char">
        <div>{title}</div>
        <img src={picture + "." + extension} alt="not found" />
        <p>{description}</p>
      </section>
    </>
  );
};

export default PersonnageId;
