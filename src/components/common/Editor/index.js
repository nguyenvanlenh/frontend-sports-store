import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { TinyMCEConfig } from "../../../configurations/configuration";

export const EditorComponent = ({ value, onEditorChange, isInvalid, feedback, editorConfig }) => {
    return (
        <>
            <Editor
                apiKey={TinyMCEConfig.apiKey}
                value={value}
                init={{
                    width: "100%",
                    height: 300,
                    menubar: false,
                    plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace code fullscreen"
                    ],
                    toolbar:
                        `undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help`
                }}
                onEditorChange={onEditorChange}
            />
            {isInvalid && <div className="invalid-feedback d-block">{feedback}</div>}
        </>
    );
};
