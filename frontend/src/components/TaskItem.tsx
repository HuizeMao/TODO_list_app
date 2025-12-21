import React from "react";
import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";

import type { Task } from "src/api/tasks";

export type TaskItemProps = {
  task: Task;
};

export function TaskItem({ task }: TaskItemProps) {
  let base_class = styles.textContainer;
  if (task.isChecked) base_class += ` ${styles.checked}`;
  return (
    <div className={styles.item}>
      {<CheckButton checked={task.isChecked} />}
      <div className={base_class}>
        <span>{task.title}</span>
        {task.description && <span>{task.description}</span>}
      </div>
    </div>
  );
}
