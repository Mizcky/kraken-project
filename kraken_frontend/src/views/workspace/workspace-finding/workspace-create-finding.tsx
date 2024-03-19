import Editor from "@monaco-editor/react";
import React, { ChangeEvent } from "react";
import Select, { components } from "react-select";
import { Api } from "../../../api/api";
import { CreateFindingAffectedRequest, FindingSeverity, SimpleFindingDefinition } from "../../../api/generated";
import { GithubMarkdown } from "../../../components/github-markdown";
import { SelectPrimitive, selectStyles } from "../../../components/select-menu";
import BookIcon from "../../../svg/book";
import FileIcon from "../../../svg/file";
import InformationIcon from "../../../svg/information";
import RelationLeftRightIcon from "../../../svg/relation-left-right";
import ScreenshotIcon from "../../../svg/screenshot";
import { handleApiError } from "../../../utils/helper";
import { setupMonaco } from "../../knowledge-base";
import { useSectionsState } from "../../knowledge-base/finding-definition/sections";
import { WORKSPACE_CONTEXT } from "../workspace";

import { toast } from "react-toastify";
import { ROUTES } from "../../../routes";
import ArrowDownIcon from "../../../svg/arrow-down";
import PlusIcon from "../../../svg/plus";
import { ScreenshotInput } from "../components/screenshot-input";
import TagList from "../components/tag-list";
import WorkspaceFindingTable from "./workspace-finding-table";

export type CreateFindingProps = {};

const SECTION = { definition: "Definition", description: "Description", affected: "Affected" };

export function WorkspaceCreateFinding(props: CreateFindingProps) {
    const {
        workspace: { uuid: workspace },
    } = React.useContext(WORKSPACE_CONTEXT);
    const [severity, setSeverity] = React.useState<FindingSeverity>("Medium");
    const [section, setSection] = React.useState<keyof typeof SECTION>("definition");
    const [findingDef, setFindingDef] = React.useState<string | undefined>(undefined); // selected definition
    const [defs, setDefs] = React.useState([] as Array<SimpleFindingDefinition>); // all definitions
    const [hover, setHover] = React.useState<SimpleFindingDefinition | undefined>(); // hovered definition
    const [screenshot, setScreenshot] = React.useState<File>();
    const [file, setFile] = React.useState<File>();
    const [fileDataURL, setFileDataURL] = React.useState<string | undefined>("");
    const [description, setDescription] = React.useState<boolean>(true);
    const [affectedVisible, setAffectedVisible] = React.useState<boolean>(true);
    const [affected, setAffected] = React.useState<Array<CreateFindingAffectedRequest>>([]);
    const [screenshotDataURL, setScreenshotDataURL] = React.useState<string | undefined>(undefined);

    const sections = useSectionsState();

    React.useEffect(() => {
        Api.knowledgeBase.findingDefinitions.all().then(
            handleApiError(({ findingDefinitions }) => {
                setDefs(findingDefinitions);
            }),
        );
    }, []);

    const fileHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const fileUploadInput = e.target;

        if (!fileUploadInput) {
            return; //File input element not found
        }

        // @ts-ignore
        const f = fileUploadInput.files[0];

        if (!f) {
            return; //No file selected
        }

        //TODO typecheck?

        setFile(f);
        setFileDataURL(URL.createObjectURL(f));
    };

    const editor = () => {
        switch (section) {
            case "definition":
                return (
                    <>
                        {hover !== undefined ? (
                            <FindingDefinitionDetails {...hover} />
                        ) : (
                            // @ts-ignore
                            <FindingDefinitionDetails {...defs.find((finding) => finding.uuid === findingDef)} />
                        )}
                    </>
                );
            case "description":
                return (
                    <Editor
                        className={"knowledge-base-editor"}
                        theme={"custom"}
                        beforeMount={setupMonaco}
                        {...sections["Description"].editor}
                        onChange={(value, event) => {
                            if (value !== undefined) sections["Description"].set(value);
                        }}
                    />
                );
            case "affected":
                return (
                    <div className="workspace-finding-data-table">
                        <WorkspaceFindingTable />
                    </div>
                );
            default:
                return "Unimplemented";
        }
    };

    return (
        <>
            <div className="pane">
                <div className="workspace-findings-selection-info">
                    <h1 className="heading">Create new finding</h1>
                </div>
                <div className="create-finding-container">
                    <form
                        className="create-finding-form"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            if (findingDef === undefined) {
                                return toast.error("Please select finding definition");
                            }

                            let fileUuid = null;
                            if (file !== undefined) {
                                await Api.workspaces.files.upload(workspace, file).then(
                                    handleApiError(({ uuid }) => {
                                        fileUuid = uuid;
                                    }),
                                );
                            }

                            let screenshotUuid = null;
                            if (screenshot !== undefined) {
                                await Api.workspaces.files.uploadImage(workspace, screenshot).then(
                                    handleApiError(({ uuid }) => {
                                        fileUuid = uuid;
                                    }),
                                );
                            }

                            Api.workspaces.findings
                                .create(workspace, {
                                    severity: severity,
                                    definition: findingDef,
                                    details: sections.Description.value,
                                    logFile: fileUuid,
                                    screenshot: screenshotUuid,
                                })
                                .then(
                                    handleApiError(async ({ uuid }) => {
                                        await Promise.all(
                                            affected.map((a) =>
                                                Api.workspaces.findings
                                                    .addAffected(workspace, uuid, a)
                                                    .then(handleApiError()),
                                            ),
                                        );
                                        ROUTES.WORKSPACE_FINDINGS_EDIT.visit({ wUuid: workspace, fUuid: uuid });
                                    }),
                                );
                        }}
                    >
                        <div className="create-finding-header">
                            <h2 className={"sub-heading"}>Severity</h2>
                            <h2 className={"sub-heading"}>
                                <InformationIcon /> Finding Definition
                            </h2>

                            <SelectPrimitive
                                value={severity}
                                options={[
                                    FindingSeverity.Okay,
                                    FindingSeverity.Low,
                                    FindingSeverity.Medium,
                                    FindingSeverity.High,
                                    FindingSeverity.Critical,
                                ]}
                                onChange={(value) => setSeverity(value || severity)}
                            />
                            <Select<{ label: string; value: string }>
                                required={true}
                                className={"dropdown"}
                                components={{
                                    Option: (props) => (
                                        <div
                                            onMouseOver={(e) => {
                                                if (section !== "definition") {
                                                    setSection("definition");
                                                }
                                                let def = defs.find((finding) => finding.name === props.label);
                                                setHover(def);
                                            }}
                                            onMouseOut={() => {
                                                setHover(undefined);
                                            }}
                                        >
                                            <components.Option {...props} />
                                        </div>
                                    ),
                                }}
                                options={
                                    defs.map((def) => ({
                                        label: def.name,
                                        value: def.uuid,
                                    })) ?? []
                                }
                                value={
                                    findingDef === undefined
                                        ? undefined
                                        : {
                                              label: defs.find((finding) => finding.uuid === findingDef)?.name || "",
                                              value: findingDef,
                                          }
                                }
                                onChange={(value) => {
                                    if (value !== undefined && value !== null) {
                                        setFindingDef(value.value);
                                        setHover(undefined);
                                    }
                                }}
                                isClearable={false}
                                autoFocus={false}
                                styles={selectStyles("default")}
                            />
                        </div>

                        <div>
                            <h2 className={"sub-heading"}>
                                <BookIcon />
                                Description
                                <div
                                    className="create-finding-section-toggle"
                                    onClick={() => setDescription(!description)}
                                >
                                    <ArrowDownIcon inverted={description} />
                                </div>
                            </h2>
                            {description ? <GithubMarkdown>{sections.Description.value}</GithubMarkdown> : <div />}
                        </div>
                        <div>
                            <h2 className={"sub-heading"}>
                                <RelationLeftRightIcon />
                                Affected
                                <div
                                    className="create-finding-section-toggle"
                                    onClick={() => setAffectedVisible(!affectedVisible)}
                                >
                                    <ArrowDownIcon inverted={affectedVisible} />
                                </div>
                            </h2>
                            {affectedVisible ? <div>TODO affected</div> : <div />}
                        </div>

                        <div className="create-finding-files">
                            <h2 className={"sub-heading"}>
                                <ScreenshotIcon />
                                Screenshot
                            </h2>
                            <h2 className={"sub-heading"}>
                                <FileIcon />
                                Log File
                            </h2>
                            <ScreenshotInput
                                screenshotDataURL={screenshotDataURL}
                                setScreenshotDataURL={setScreenshotDataURL}
                                setScreenshot={setScreenshot}
                                className="create-finding-screenshot-container"
                            />
                            <div className="create-finding-file-container">
                                <div className="create-finding-log-file">
                                    <label className="button create-finding-file-upload" htmlFor="upload">
                                        Upload
                                    </label>
                                    <input id="upload" type="file" onChange={fileHandler} />
                                </div>
                                {file ? (
                                    <div className="create-finding-file-grid">
                                        <button
                                            title="Remove file"
                                            className="button"
                                            onClick={() => {
                                                setFileDataURL("");
                                                setFile(undefined);
                                            }}
                                        >
                                            <PlusIcon />
                                        </button>
                                        <a className="create-finding-file-name" download={file.name} href={fileDataURL}>
                                            <span>{file.name}</span>
                                        </a>
                                    </div>
                                ) : undefined}
                            </div>
                        </div>
                        {/*TODO Create finding on button click*/}
                        <button type={"submit"} className="button">
                            Create
                        </button>
                    </form>
                    <div className="create-finding-editor-container">
                        <div className="knowledge-base-editor-tabs">
                            <button
                                title={"Finding Definition"}
                                className={`knowledge-base-editor-tab ${section === "definition" ? "selected" : ""}`}
                                onClick={() => {
                                    setSection("definition");
                                }}
                            >
                                <InformationIcon />
                            </button>
                            <button
                                title={"Description"}
                                className={`knowledge-base-editor-tab ${section === "description" ? "selected" : ""}`}
                                onClick={() => {
                                    setSection("description");
                                }}
                            >
                                <BookIcon />
                            </button>
                            <button
                                title={"Affected"}
                                className={`knowledge-base-editor-tab ${section === "affected" ? "selected" : ""}`}
                                onClick={() => {
                                    setSection("affected");
                                }}
                            >
                                <RelationLeftRightIcon />
                            </button>
                        </div>
                        {editor()}
                    </div>
                </div>
            </div>
        </>
    );
}

export function FindingDefinitionDetails(props: SimpleFindingDefinition) {
    const { name, severity, summary } = props;
    return (
        <div className={"create-finding-pane"}>
            <h1 className={"sub-heading"}>
                {name} <small>{severity}</small>
            </h1>
            <p>{summary}</p>
        </div>
    );
}
