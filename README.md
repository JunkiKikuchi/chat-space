# DB設計
## usersテーブル
|column|type|options|
|------|----|-------|
|name|string|unique: true, null: false|
|email|string|unique: true, null: false|
|password|string|null: false|
|created_at|datetime|null:false|
|updated_at|datetime|null: false|

### Association
- has_many :messages
- has_many :members
- has_many :groups, through: :members

## groupsテーブル
|column|type|options|
|------|----|-------|
|name|string|unique: true, null: false|
|created_at|datetime|null:false|
|updated_at|datetime|null: false|

### Association
- has_many :messages
- has_many :members
- has_many :users, through: :members

## membersテーブル
|column|type|options|
|------|----|-------|
|group_id|reference|null: false, foreign_key: true|
|user_id|reference|null: false, foreign_key: true|
|created_at|datetime|null:false|
|updated_at|datetime|null: false|

### Association
- belongs_to :user
- belongs_to :group

## messagesテーブル
|column|type|options|
|------|----|-------|
|message|string|null: true, default: null|
|image|string|null: true, default: null|
|group_id|reference|null: false, index: true, foreign_key: true|
|user_id|reference|null: false, index: true, foreign_key: true|
|created_at|datetime|null:false|

### Association
- belongs_to :group
- belongs_to :user
- validates message, presence: true, unless: :image?
