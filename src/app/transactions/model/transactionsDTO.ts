import { Ref, getModelForClass, prop } from "@typegoose/typegoose";
import { User } from "app/users/model/User";
import { ObjectId } from "mongodb";
import PaymentStatus from "resources/strings/app/payment";

class Transactions {
  // ObjectId generated by mongodb
  @prop()
  public id!: ObjectId;

  /**
   * @param user - user
   */
  @prop({ type: ObjectId, required: true })
  public user!: Ref<User>;
  /**
   * @param madeFirstTransaction - The referral is completed once the user made his first transaction
   */
  @prop({ required: true })
  public amount!: number;

  @prop({ default: PaymentStatus.PROCESSING, enum: PaymentStatus })
  public status!: string;

  @prop()
  public mode!: string;

  @prop()
  public success!: boolean;
}

const TransactionModel = getModelForClass(Transactions, {
  schemaOptions: {
    collection: "transactions",
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  },
});

export { Transactions, TransactionModel };
