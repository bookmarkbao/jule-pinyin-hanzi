// src/components/Hello.tsx
import { defineComponent } from 'vue'
import { Button } from 'vant'

export default defineComponent({
  props: {
    msg: String,
  },
  setup(props) {
    return () => (
      <div style={{ padding: '16px', color: '#1989fa' }}>
        TSX Works! {props.msg}
        <Button type="primary">Vant Button</Button>
      </div>
    )
  },
})
