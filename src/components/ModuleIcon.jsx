import {
  Binary,
  Network,
  Boxes,
  Code2,
  Database,
  Cpu,
  Globe,
  Users,
  Layout,
  Brain,
} from 'lucide-react'

const map = { Binary, Network, Boxes, Code2, Database, Cpu, Globe, Users, Layout, Brain }

export default function ModuleIcon({ name, ...props }) {
  const Icon = map[name] || Code2
  return <Icon {...props} />
}
