"use client";

import {
    PutObjectCommand,
    DeleteObjectCommand,
    // DeleteObjectsCommand,
    // ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { s3Client, region, bucket } from "@/lib/aws";

export const InvitationStorageService = {
    async upload(file, invitationId) {
        // if (!file) throw new Error("File is required");
        // if (!invitationId) throw new Error("Invitation ID is required");

        if (!(file instanceof Blob)) {
            console.error("Invalid upload input:", file);
            throw new Error("Upload expects Blob/File");
        }

        const key = `invitations/${invitationId}/${Date.now()}-${file.name}`;
        const arrayBuffer = await file.arrayBuffer();
        const body = new Uint8Array(arrayBuffer);

        // const upload = new Upload({
        //     client: s3Client,
        //     params: {
        //         Bucket: bucket,
        //         Key: key,
        //         Body: file,
        //         ContentType: file.type,
        //     },
        // });

        // await upload.done();

        // return {
        //     key,
        //     url: `https://${bucket}.s3.${region}.amazonaws.com/${key}`,
        // };

        await s3Client.send(
            new PutObjectCommand({
                Bucket: bucket,
                Key: key,
                // Body: file,
                Body: body,
                ContentType: file.type,
            })
        );

        return {
            key,
            url: `https://${bucket}.s3.${region}.amazonaws.com/${key}`,
        };
    },

    async uploadMany(files, invitationId) {
        if (!files?.length || !invitationId) return [];

        const uploaded = await Promise.all(
            files.map((file) => this.upload(file, invitationId)),
        );

        return uploaded.map((img) => img.url);
    },

    async delete(key) {
        if (!key) return;
        await s3Client.send(
            new DeleteObjectCommand({
                Bucket: bucket,
                Key: key,
            })
        );
    },

    // TODO Images with folder should be deleted after the invitation expires using a cron job.
    // async deleteInvitationFolder(invitationId) {
    //     if (!invitationId) return;

    //     const prefix = `invitations/${invitationId}/`;

    //     const listed = await s3Client.send(
    //         new ListObjectsV2Command({
    //             Bucket: bucket,
    //             Prefix: prefix,
    //         })
    //     );

    //     if (!listed.Contents || !listed.Contents.length) return;

    //     await s3Client.send(
    //         new DeleteObjectsCommand({
    //             Bucket: bucket,
    //             Delete: {
    //                 Objects: listed.Contents.map(obj => ({ Key: obj.Key })),
    //             },
    //         })
    //     );
    // },
};