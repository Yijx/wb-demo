import {
  Button,
  Card,
  Col,
  Image,
  Empty,
  Form,
  Input,
  message,
  Row,
  Select,
  Tabs,
} from "antd";
import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import rehypeRaw from "rehype-raw";

class ContractAIService {
  constructor(config) {}

  async getDiffResult(srcFile, srcFilePages, scanFile, scanFilePages) {
  
  }

  scanFileBaseName(scanFile) {
    let scanFileBaseName = scanFile.split("/").pop();
    scanFileBaseName = scanFileBaseName.substring(
      0,
      scanFileBaseName.length - ".txt.cleaned".length
    );
    scanFileBaseName = scanFileBaseName.endsWith("_ocr")
      ? scanFileBaseName.substring(0, scanFileBaseName.length - "_ocr".length)
      : scanFileBaseName;
    return scanFileBaseName;
  }
}

// const service = new ContractAIService(services.config);

const _ContractAI = (props) => {
  const { t: _ } = props;
  const [srcFiles, setSrcFiles] = useState([]);
  const [scanFiles, setScanFiles] = useState([]);
  const [scanFileResultImgs, setScanFileResultImgs] = useState([]);
  const [fileDiffResult, setFileDiffResult] = useState(null);
  const [fullScreen, setFullScreen] = useState(false);
  const [fileComparisionUrl, setFileComparisionUrl] = useState("");
  const [srcFile, setSrcFile] = useState("");
  const [scanFile, setScanFile] = useState("");
  const [srcFilePages, setSrcFilePages] = useState("");
  const [scanFilePages, setScanFilePages] = useState("");
  const heightFix = window.innerHeight - 1015;
  const tabContentHeight = fullScreen ? 510 + 260 + heightFix : 510 + heightFix;

  useEffect(() => {
    // services.fileService
    //   .findFiles("doc/test-result/*.txt.cleaned", {
    //     includeTest: true,
    //     ignoreFolder: true,
    //   })
    //   .then((files) => {
    //     files = files.sort();
    //     setSrcFiles(files);
    //     setScanFiles(files);
    //   });
  }, []);

  const updateScanFileResultImgs = (_scanFile) => {
    _scanFile = _scanFile || scanFile;
    if (!_scanFile) {
      return;
    }
    const scanFileBaseName = service.scanFileBaseName(_scanFile);
    // services.fileService
    //   .findFiles(
    //     `doc/test-result/${scanFileBaseName}/${scanFileBaseName}*.*_res.png`,
    //     { includeTest: true, ignoreFolder: true }
    //   )
    //   .then((files) => {
    //     const fileIdx = (f) => {
    //       f = f.split("/").pop();
    //       f = f.substring(scanFileBaseName.length + "_".length);
    //       f = f.substring(0, f.indexOf("."));
    //       return parseInt(f);
    //     };
    //     files = files
    //       .sort((f, f1) => fileIdx(f) - fileIdx(f1))
    //       .map((f) => services.config.projectFileUrl(f));
    //     setScanFileResultImgs(files);
    //   });
  };

  const updateFileDiffResult = () => {
    // service
    //   .getDiffResult(srcFile, srcFilePages, scanFile, scanFilePages)
    //   .then((result) => setFileDiffResult(result))
    //   .catch((err) => {
    //     message.error(err.message);
    //   });
  };

  useEffect(updateScanFileResultImgs, [scanFile]);

  const onFinish = () => {
    console.log("onFinish form");
  };

  const runComparison = () => {
    updateFileDiffResult();

    const original = encodeURIComponent("../" + srcFile);
    const modified = encodeURIComponent("../" + scanFile);
    // const fileComparisionUrl = services.config.projectFileUrl(
    //   `docdiff/index.html?r=${Math.random()}&original=${original}&originalPages=${srcFilePages}&modified=${modified}&modifiedPages=${scanFilePages}}`
    // );
    // setFileComparisionUrl(fileComparisionUrl);
  };

  const renderFileContent = () => {
    return srcFile || scanFile ? (
      <div>
        <Row gutter={16}>
          <Col
            className="gutter-row"
            style={{ height: fullScreen ? 800 + heightFix : 540 + heightFix }}
            span={12}
          >
            <FileEditor
              key={Math.random() + ""}
              openFiles={srcFile ? [srcFile] : []}
              closable={false}
            />
          </Col>
          <Col
            className="gutter-row"
            style={{ height: fullScreen ? 800 + heightFix : 540 + heightFix }}
            span={12}
          >
            <FileEditor
              key={Math.random() + ""}
              openFiles={scanFile ? [scanFile] : []}
              closable={false}
            />
          </Col>
        </Row>
      </div>
    ) : (
      <Empty description="请选择原件和扫描件查看内容！" />
    );
  };

  const renderFileComparison = () => {
    return fileComparisionUrl ? (
      <div style={{ height: tabContentHeight }}>
        <iframe
          src={fileComparisionUrl}
          style={{ width: "100%", height: "100%", border: "none" }}
        ></iframe>
      </div>
    ) : (
      <Empty description="请选择原件和扫描件，并点击开始进行对比！" />
    );
  };

  const renderEditOps = () => {
    return fileDiffResult ? (
      <div>
        <Card style={{ height: tabContentHeight, overflow: "auto" }}>
          <div
            style={{
              float: "right",
            }}
          >{`原文件长度: ${fileDiffResult.stat.original_len} 扫描件长度: ${fileDiffResult.stat.modified_len} 增加字符: ${fileDiffResult.stat.add} 删除字符: ${fileDiffResult.stat.del} 未改变字符: ${fileDiffResult.stat.eq}`}</div>
          <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
            {fileDiffResult.result_marked}
          </ReactMarkdown>
        </Card>
      </div>
    ) : (
      <Empty description="请选择原件和扫描件，并点击开始对比进行对比！" />
    );
  };

  const renderReconstruction = () => {
    const reconstructHtml = (scanFile) => {
      const scanFileBaseName = service.scanFileBaseName(scanFile);
      return `doc/test-result/${scanFileBaseName}_ocr_md/${scanFileBaseName}_ocr.html`;
    };
    return scanFile ? (
      <div style={{ height: tabContentHeight }}>
        <iframe
          src={services.config.projectFileUrl(
            `${reconstructHtml(scanFile)}?r=${Math.random()}`
          )}
          style={{ width: "100%", height: "100%", border: "none" }}
        ></iframe>
      </div>
    ) : (
      <Empty description={"请选择扫描件查看结果！"} />
    );
  };

  const renderPredictions = () => {
    return scanFile && scanFileResultImgs.length ? (
      <div style={{ height: tabContentHeight, overflow: "auto" }}>
        <Image.PreviewGroup
          preview={{
            onChange: (current, prev) =>
              console.log(`current index: ${current}, prev index: ${prev}`),
          }}
        >
          {scanFileResultImgs.map((img, index) => {
            return (
              <Image
                alt={`第${index + 1}页`}
                key={index}
                width={300}
                src={img}
              />
            );
          })}
        </Image.PreviewGroup>
      </div>
    ) : (
      <Empty
        description={
          scanFileResultImgs.length === 0
            ? "当前扫描件无识别结果，请确认该文件确实为扫描件！"
            : "请选择扫描件查看结果！"
        }
      />
    );
  };

  const items = [
    {
      key: "1",
      label: `图片识别结果`,
      children: renderPredictions(),
    },
    {
      key: "2",
      label: `文档重建结果`,
      children: renderReconstruction(),
    },
    {
      key: "3",
      label: `文件内容`,
      children: renderFileContent(),
    },
    {
      key: "4",
      label: `文件对比（左右）`,
      children: renderFileComparison(),
    },
    {
      key: "5",
      label: `文件对比（单个）`,
      children: renderEditOps(),
    },
  ];
  const onTabChange = (key) => {
    console.log(key);
  };
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        textAlign: "left",
        background: "white",
        position: "relative",
        ...(fullScreen ? { position: "absolute", top: 0, left: 0 } : {}),
      }}
    >
      <Card>
        <Form name="showOpts" layout="inline" onFinish={onFinish}>
          <Form.Item name="srcFile" label="合同原文件" required>
            <Select
              value={srcFile}
              style={{ width: 350, margin: "0 8px" }}
              onChange={(v) => {
                setSrcFile(v);
                setFileComparisionUrl("");
                setFileDiffResult(null);
              }}
            >
              {srcFiles.map((file) => {
                return (
                  <Select.Option key={file} value={file}>
                    {file}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item name="srcFilePages" label="页码">
            <Input
              value={srcFilePages}
              onChange={(e) => {
                setSrcFilePages(e.target.value.trim());
                setFileDiffResult(null);
                setFileComparisionUrl("");
              }}
              style={{ width: 80 }}
            ></Input>
          </Form.Item>
          <Form.Item name="scanFile" label="合同扫描件" required>
            <Select
              value={scanFile}
              style={{ width: 350, margin: "0 8px" }}
              onChange={(e) => {
                setScanFile(e);
                updateScanFileResultImgs(e);
                setFileDiffResult(null);
                setFileComparisionUrl("");
              }}
            >
              {scanFiles.map((file) => {
                return (
                  <Select.Option key={file} value={file}>
                    {file}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item name="scanFilePages" label="页码">
            <Input
              value={scanFilePages}
              onChange={(e) => {
                setScanFilePages(e.target.value.trim());
              }}
              style={{ width: 80 }}
            ></Input>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={runComparison}>
              开始对比
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="default" onClick={() => setFullScreen(!fullScreen)}>
              {fullScreen ? "退出全屏" : "全屏显示"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card style={{ marginTop: 16 }}>
        <Tabs defaultActiveKey="1" items={items} onChange={onTabChange} />
      </Card>
    </div>
  );
};

const ContractAI = withTranslation("", { withRef: true })(_ContractAI);

export default ContractAI