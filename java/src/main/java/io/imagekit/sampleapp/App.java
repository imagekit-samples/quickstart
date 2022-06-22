package io.imagekit.sampleapp;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import io.imagekit.sdk.ImageKit;
import io.imagekit.sdk.config.Configuration;
import io.imagekit.sdk.models.BaseFile;
import io.imagekit.sdk.models.FileCreateRequest;
import io.imagekit.sdk.models.results.*;
import io.imagekit.sdk.utils.Utils;
import java.io.File;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.util.*;
import java.util.stream.Collectors;

class App {

  public static void main(String[] args) throws Exception {
    ImageKit imageKit = ImageKit.getInstance();
    Configuration config = Utils.getSystemConfig(App.class);
    imageKit.setConfig(config);

    uploadFromURL();
    uploadFromBase64();
    uploadFromBytes();
    generatingAuthParams();

    List<BaseFile> files = getList(0, 10);
    if (null != files && files.size() > 0) {
      getFileDetail(files.get(0).getFileId());
      generateUrl(files.get(0));
      System.out.println(Color.ANSI_RESET);
    }

    System.exit(0);
  }

  private static void generatingAuthParams() {
    System.out.println(
      Color.ANSI_CYAN +
      ">> Generating Authentication Parameters:" +
      Color.ANSI_RESET
    );
    Map<String, String> authenticationParameters = ImageKit
      .getInstance()
      .getAuthenticationParameters();
    System.out.println(Color.ANSI_GREEN + ">> Results:" + Color.ANSI_RESET);
    System.out.println(authenticationParameters);
    System.out.println("\n\n");
  }

  private static void generateUrl(BaseFile baseFile) {
    System.out.println(
      Color.ANSI_CYAN + ">> URL Generation:" + Color.ANSI_RESET
    );
    String urlEndpoint = ImageKit.getInstance().getConfig().getUrlEndpoint();
    Map<String, String> queryParam = new HashMap<>();
    queryParam.put("v", "123");

    List<Map<String, String>> transformation = new ArrayList<Map<String, String>>();
    Map<String, String> scale = new HashMap<>();
    scale.put("height", "600");
    scale.put("width", "400");
    transformation.add(scale);
    Map<String, String> rotate = new HashMap<>();
    rotate.put("rotation", "90");
    transformation.add(rotate);

    Map<String, String> format = new HashMap<>();
    format.put("format", "jpg");
    format.put("progressive", "true");
    format.put("effectSharpen", "-");
    format.put("effectContrast", "1");
    format.put("blur", "5%");

    transformation.add(format);

    Map<String, Object> options = new HashMap();
    options.put("path", baseFile.getFilePath());
    options.put("transformation", transformation);

    String url1 = ImageKit.getInstance().getUrl(options);

    options.clear();
    options.put("path", baseFile.getFilePath());
    options.put("urlEndpoint", urlEndpoint);
    options.put("queryParameters", queryParam);
    options.put("transformation", transformation);
    options.put("transformationPosition", "query");
    options.put("signed", true);
    options.put("expireSeconds", 10);

    String url2 = ImageKit.getInstance().getUrl(options);

    options.remove("transformationPosition");
    String url3 = ImageKit.getInstance().getUrl(options);

    options.clear();
    options.put("src", baseFile.getUrl());
    options.put("queryParameters", queryParam);
    options.put("transformation", transformation);

    String url4 = ImageKit.getInstance().getUrl(options);

    System.out.println(">> Generated URL #1:\t" + url1);
    System.out.println(">> Generated URL #2:\t" + url2);
    System.out.println(">> Generated URL #3:\t" + url3);
    System.out.println(">> Generated URL #4:\t" + url4);
    System.out.println("\n\n");
  }

  private static List<BaseFile> getList(int skip, int limit) {
    System.out.println(
      Color.ANSI_CYAN + ">> Get Uploaded file as List:" + Color.ANSI_RESET
    );
    System.out.println(">> Fetching list...");
    Map<String, String> options = new HashMap<>();
    options.put("skip", "" + skip);
    options.put("limit", "" + limit);
    ResultList resultList = ImageKit.getInstance().getFileList(options);
    System.out.println(">> Fetching done...");
    System.out.println(Color.ANSI_GREEN + ">> Response:" + Color.ANSI_RESET);
    System.out.println(
      ">> No. of files in server: " + resultList.getResults().size()
    );
    System.out.println(
      ">> FileIds: " +
      resultList
        .getResults()
        .stream()
        .map(baseFile -> baseFile.getFileId())
        .collect(Collectors.toList())
    );
    System.out.println(
      Color.ANSI_GREEN + ">> Raw Response:" + Color.ANSI_RESET
    );
    System.out.println(resultList.getResponseMetaData().getRaw());
    System.out.println(
      Color.ANSI_GREEN + ">> Map Response:" + Color.ANSI_RESET
    );
    System.out.println(resultList.getResponseMetaData().getMap());
    System.out.println("\n\n");
    return resultList.getResults();
  }

  private static void getFileDetail(String fileId) {
    System.out.println(
      Color.ANSI_CYAN + ">> Get file details:" + Color.ANSI_RESET
    );
    System.out.println(">> Fetching details...");
    Result result = ImageKit.getInstance().getFileDetail(fileId);
    System.out.println(">> Fetching done...");
    System.out.println(Color.ANSI_GREEN + ">> Response:" + Color.ANSI_RESET);
    System.out.println(result);
    System.out.println(
      Color.ANSI_GREEN + ">> Raw Response:" + Color.ANSI_RESET
    );
    System.out.println(result.getResponseMetaData().getRaw());
    System.out.println(
      Color.ANSI_GREEN + ">> Map Response:" + Color.ANSI_RESET
    );
    System.out.println(result.getResponseMetaData().getMap());
    System.out.println("\n\n");
  }

  private static void uploadFromURL() {
    System.out.println(
      Color.ANSI_CYAN + ">> Uploading from URL:" + Color.ANSI_RESET
    );
    System.out.println(">> Start uploading...");
    String imageUrl = "https://homepages.cae.wisc.edu/~ece533/images/cat.png";
    URL url = null;
    try {
      url = URI.create(imageUrl).toURL();
    } catch (MalformedURLException e) {
      e.printStackTrace();
    }
    FileCreateRequest fileCreateRequest = new FileCreateRequest(
      url,
      "sample-image.jpg"
    );
    fileCreateRequest.setFolder("demo1");
    String customCoordinates = "10,10,20,20";
    fileCreateRequest.setCustomCoordinates(customCoordinates);
    List<String> tags = new ArrayList<>();
    tags.add("Software");
    tags.add("Developer");
    tags.add("Engineer");
    fileCreateRequest.setTags(tags);

    List<String> responseFields = new ArrayList<>();
    responseFields.add("thumbnail");
    responseFields.add("tags");
    responseFields.add("customCoordinates");

    fileCreateRequest.setResponseFields(responseFields);
    System.out.println(">> Ref: URL= " + imageUrl);
    Result result = ImageKit.getInstance().upload(fileCreateRequest);
    System.out.println(">> Uploading done.");
    System.out.println(Color.ANSI_GREEN + ">> Response:" + Color.ANSI_RESET);
    System.out.println(result);
    System.out.println(
      Color.ANSI_GREEN + ">> Raw Response:" + Color.ANSI_RESET
    );
    System.out.println(result.getResponseMetaData().getRaw());
    System.out.println(
      Color.ANSI_GREEN + ">> Map Response:" + Color.ANSI_RESET
    );
    System.out.println(result.getResponseMetaData().getMap());
    System.out.println("\n\n");
  }

  private static void uploadFromBase64() {
    System.out.println(
      Color.ANSI_CYAN + ">> Uploading Base64 Image:" + Color.ANSI_RESET
    );
    System.out.println(">> Start uploading...");
    URL url = App.class.getClassLoader().getResource("sample1.jpg");
    File file = new File(url.getPath());
    String base64 = Utils.fileToBase64(file);
    FileCreateRequest fileCreateRequest = new FileCreateRequest(
      base64,
      "sample_base64_image.jpg"
    );
    Result result = ImageKit.getInstance().upload(fileCreateRequest);
    System.out.println(">> Uploading done.");
    System.out.println(Color.ANSI_GREEN + ">> Response:" + Color.ANSI_RESET);
    System.out.println(result);
    System.out.println(
      Color.ANSI_GREEN + ">> Raw Response:" + Color.ANSI_RESET
    );
    System.out.println(result.getResponseMetaData().getRaw());
    System.out.println(
      Color.ANSI_GREEN + ">> Map Response:" + Color.ANSI_RESET
    );
    System.out.println(result.getResponseMetaData().getMap());
    System.out.println("\n\n");
  }

  private static void uploadFromBytes() {
    System.out.println(
      Color.ANSI_CYAN + ">> Uploading Image from file:" + Color.ANSI_RESET
    );
    System.out.println(">> Start uploading...");
    URL url = App.class.getClassLoader().getResource("sample1.jpg");
    File file = new File(url.getPath());
    byte[] bytes = Utils.fileToBytes(file);
    FileCreateRequest fileCreateRequest = new FileCreateRequest(
      bytes,
      "sample_image_th.jpg"
    );
    fileCreateRequest.setUseUniqueFileName(false);
    JsonObject optionsInnerObject = new JsonObject();
    optionsInnerObject.addProperty("add_shadow", true);
    optionsInnerObject.addProperty("bg_colour", "green");
    JsonObject innerObject1 = new JsonObject();
    innerObject1.addProperty("name", "remove-bg");
    innerObject1.add("options", optionsInnerObject);
    JsonObject innerObject2 = new JsonObject();
    innerObject2.addProperty("name", "google-auto-tagging");
    innerObject2.addProperty("minConfidence", 5);
    innerObject2.addProperty("maxTags", 95);
    JsonArray jsonArray = new JsonArray();
    jsonArray.add(innerObject1);
    jsonArray.add(innerObject2);
    fileCreateRequest.setExtensions(jsonArray);
    fileCreateRequest.setWebhookUrl(
      "https://webhook.site/c78d617f-33bc-40d9-9e61-608999721e2e"
    );
    fileCreateRequest.setOverwriteFile(true);
    fileCreateRequest.setOverwriteAITags(true);
    fileCreateRequest.setOverwriteTags(true);
    fileCreateRequest.setOverwriteCustomMetadata(true);
    JsonObject jsonObjectCustomMetadata = new JsonObject();
    jsonObjectCustomMetadata.addProperty("test1", 10);
    fileCreateRequest.setCustomMetadata(jsonObjectCustomMetadata);
    Result result = ImageKit.getInstance().upload(fileCreateRequest);
    System.out.println(">> Uploading done.");
    System.out.println(Color.ANSI_GREEN + ">> Response:" + Color.ANSI_RESET);
    System.out.println(result);
    System.out.println(
      Color.ANSI_GREEN + ">> Raw Response:" + Color.ANSI_RESET
    );
    System.out.println(result.getResponseMetaData().getRaw());
    System.out.println(
      Color.ANSI_GREEN + ">> Map Response:" + Color.ANSI_RESET
    );
    System.out.println(result.getResponseMetaData().getMap());
    System.out.println("\n\n");
  }
}
