import React from "react";
import styles from "./ClickSaveForm.module.scss";
import { useForm, Controller} from "react-hook-form";

export const Form = ({ onSave, children }) => {
  const { control, handleSubmit, register, setValue } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    // handleUpdate(data.name, data.description);
    onSave(data.name, data.description)
  };

  console.log(children);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      
      <div className={styles.formpage}>
        {children.map((item, i) => (
          <div key={i} className={styles.container}>
            <label className={styles.inputlabel}>{item.props.label}</label>
            <Controller
              render={({ field }) => (
                <item.type
                  {...field}
                  placeholder={item.props.placeholder}
                  className={styles.textinput}
                ></item.type>
              )}
              name="firstName"
              control={control}
              // defaultValue="yeh"
              {...register(`${item.props.name}`)}
              {...setValue(`${item.props.name}`, item.props.value, {
                shouldTouch: true,
              })}
              className="materialUIInput"
            />
          </div>
        ))}
      </div>
      <input type="submit" value="Save" className={styles.submitbutton}></input>
    </form>
  );
};
