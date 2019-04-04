class RenameMessagesColumnToMessages < ActiveRecord::Migration[5.0]
  def change
    rename_column :messages, :messages, :message
  end
end
