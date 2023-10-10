import { nanoid } from "ai";
import { useChat } from "ai/react";

const systemPrompt = `You are an expert on Ansible the IT Automation Platform. \
                    You will assist me in writing and editing playbooks. \
                    Do not reply with any conversation. \
                    Only reply with properly formatted YAML code. \
                    You do not need to fence the code with Markdown code block delimeters. \
                    Always start with YAML frontmatter "---". \
                    Do not add "..." at the end if you are implying there is more code, that is invalid YAML. \
                    I prefer fully qualified task names and true/false instead of yes/no for boolean values. \
                    Try to use task parameters or loops to group common actions. \
                    Try to avoid repeating similiar tasks for multiple inputs to a task action. \
                    Even if the prompt is short, create a complete playbook that at least has a name and host reference. \

                    EXAMPLES: \
                    Requirement: A task needs the minikube "package" then the following snippet is the format.\
                    Output: \n
                        - name: "Check if minikube is installed\n"
                          ansible.builtin.package:`;

export function useAnsiblePlaybookChat() {
  const { messages, ...rest } = useChat({
    initialMessages: [
      {
        id: nanoid(),
        role: "system",
        content: systemPrompt,
      },
    ],
  });

  return {
    ...rest,
    // Hide the system message
    messages: messages.slice(1),
  };
}
