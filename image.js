const { BlobServiceClient, StorageSharedKeyCredential, generateBlobSASQueryParameters, BlobSASPermissions } = require("@azure/storage-blob");

const connectionString = process.env.STORAGE_ACC_CONNECTION_STRING;

const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);

async function getImageUrl(containerName, blobName) {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlobClient(blobName);

  return blobClient.url;
}

async function getSasUrl(containerName, blobName) {
  const accountName = process.env.STORAGE_ACC_NAME;
  const accountKey = process.env.STORAGE_ACC_KEY;

  const sharedKeyCredential =
    new StorageSharedKeyCredential(accountName, accountKey);

  const sasToken = generateBlobSASQueryParameters(
    {
      containerName,
      blobName,
      permissions: BlobSASPermissions.parse("r"),
      expiresOn: new Date(Date.now() + 15 * 60 * 1000) // 15 mins
    },
    sharedKeyCredential
  ).toString();
  const img = await getImageUrl(containerName, blobName);
  return `${img}?${sasToken}`;
}

module.exports = { getSasUrl };